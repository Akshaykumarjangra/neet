<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Explainer Player - ZERO AI</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        body { margin: 0; padding: 0; background-color: #0c0e12; color: #f6f6fc; font-family: 'Inter', system-ui, sans-serif; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; }
        #canvas-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
        #ui-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; box-sizing: border-box; padding: 40px; }
        .top-bar { display: flex; justify-content: space-between; align-items: flex-start; pointer-events: auto; }
        .ai-badge { background: rgba(0, 227, 253, 0.1); border: 1px solid #00e3fd; color: #81ecff; padding: 8px 24px; border-radius: 50px; font-size: 0.9rem; font-weight: bold; font-family: 'Space Grotesk', sans-serif; box-shadow: 0 0 20px rgba(0, 227, 253, 0.3); letter-spacing: 1px; text-transform: uppercase; }
        .sidebar { position: absolute; right: 40px; top: 100px; width: 400px; background: rgba(23, 26, 31, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(70, 72, 77, 0.3); border-radius: 24px; padding: 32px; pointer-events: auto; display: flex; flex-direction: column; gap: 20px; box-shadow: 0 40px 60px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.05); transition: all 0.5s ease; transform: translateX(500px); opacity: 0; }
        .sidebar.visible { transform: translateX(0); opacity: 1; }
        .chapter-title { font-family: 'Space Grotesk', sans-serif; color: #81ecff; font-size: 1.8rem; font-weight: bold; line-height: 1.2; letter-spacing: -0.02em; margin: 0; text-shadow: 0 0 15px rgba(0, 212, 236, 0.4); }
        .slide-heading { font-size: 1.1rem; color: #6e9bff; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; margin-bottom: -10px; }
        .transcript-box { background: rgba(12, 14, 18, 0.5); border-radius: 16px; padding: 24px; font-size: 1.1rem; line-height: 1.6; color: #f6f6fc; border-left: 3px solid #00e3fd; height: 250px; display: flex; align-items: center; }
        .control-bar { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); width: 800px; background: rgba(35, 38, 44, 0.7); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(70, 72, 77, 0.3); border-radius: 100px; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; pointer-events: auto; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); }
        .play-btn { background: linear-gradient(135deg, #81ecff, #00e3fd); color: #003840; border: none; width: 64px; height: 64px; border-radius: 50%; font-size: 1.5rem; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 0 20px rgba(0, 227, 253, 0.4), inset 0 0 10px rgba(255,255,255,0.5); transition: all 0.3s ease; }
        .play-btn:hover { transform: scale(1.1); box-shadow: 0 0 30px rgba(0, 227, 253, 0.7), inset 0 0 10px rgba(255,255,255,0.5); }
        .play-btn.playing { background: rgba(0, 227, 253, 0.1); border: 2px solid #00e3fd; color: #81ecff; box-shadow: none; }
        .progress-container { flex-grow: 1; margin: 0 32px; height: 8px; background: rgba(12, 14, 18, 0.8); border-radius: 10px; overflow: hidden; position: relative; }
        .progress-fill { position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, #6e9bff, #00e3fd); border-radius: 10px; transition: width 0.5s linear; box-shadow: 0 0 10px #00e3fd; }
        .status-text { font-family: 'Space Grotesk', sans-serif; color: #aaabb0; font-weight: 500; font-size: 0.9rem; width: 100px; text-align: right; }
    </style>
</head>
<body>
    <div id="canvas-container"></div>
    <div id="ui-layer">
        <div class="top-bar"><div class="ai-badge">Obsidian Lab Interface</div></div>
        <div class="sidebar" id="sidebar">
            <div class="slide-heading" id="slide-num">Slide 1</div>
            <h1 class="chapter-title" id="chapter-title">Loading...</h1>
            <div class="transcript-box"><div id="transcript-text"></div></div>
        </div>
        <div class="control-bar">
            <button class="play-btn" id="start-btn" onclick="startPresentation()">▶</button>
            <div class="progress-container"><div class="progress-fill" id="progress"></div></div>
            <div class="status-text" id="status-label">READY</div>
        </div>
    </div>
    <script>
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0c0e12, 0.003);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40; camera.position.x = -15; 
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        let current3DObject = new THREE.Group();
        scene.add(current3DObject);

        const ambientGeo = new THREE.BufferGeometry();
        const ambientCount = 2000;
        const posArray = new Float32Array(ambientCount * 3);
        for(let i=0; i<ambientCount*3; i++) { posArray[i] = (Math.random() - 0.5) * 150; }
        ambientGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const ambientMat = new THREE.PointsMaterial({ size: 0.15, color: 0x81ecff, transparent: true, opacity: 0.2 });
        scene.add(new THREE.Points(ambientGeo, ambientMat));

        let animationFunction = () => {};

        function buildAbstractScene() {
            const group = new THREE.Group();
            const geometry = new THREE.SphereGeometry(0.5, 16, 16);
            const material1 = new THREE.MeshBasicMaterial({ color: 0x81ecff, transparent: true, opacity: 0.9 });
            const material2 = new THREE.MeshBasicMaterial({ color: 0x6e9bff, transparent: true, opacity: 0.7 });
            for (let i = 0; i < 150; i++) {
                const mesh1 = new THREE.Mesh(geometry, material1);
                const mesh2 = new THREE.Mesh(geometry, material2);
                const t = i * 0.25; const radius = 6;
                mesh1.position.set(Math.cos(t) * radius, (i - 75) * 0.6, Math.sin(t) * radius);
                mesh2.position.set(Math.cos(t + Math.PI) * radius, (i - 75) * 0.6, Math.sin(t + Math.PI) * radius);
                group.add(mesh1); group.add(mesh2);
            }
            animationFunction = () => { group.rotation.y += 0.005; group.rotation.x = 0.1; };
            return group;
        }

        function switch3DScene() {
            scene.remove(current3DObject);
            current3DObject = buildAbstractScene();
            scene.add(current3DObject);
        }

        function animate3D() {
            requestAnimationFrame(animate3D);
            animationFunction();
            renderer.render(scene, camera);
        }
        animate3D();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const scenes = [
  {"title": "Reproductive Health", "text": "Welcome, future doctors! Today, we delve into Reproductive Health, a crucial topic for building a healthy society. Understanding this chapter is key to both NEET and real-world well-being, covering vital aspects of human reproduction and well-being."},
  {"title": "Birth Control", "text": "Let's explore birth control methods, essential for family planning and population control. From natural techniques to barrier methods like condoms, IUDs, hormonal options like pills, and permanent surgical procedures, we'll cover them all efficiently."},
  {"title": "Preventing STDs", "text": "Next, we tackle Sexually Transmitted Diseases, or STDs, a serious public health concern. Learn about common bacterial and viral infections like HIV/AIDS and Syphilis, and most importantly, how to prevent their spread through safe practices and awareness."},
  {"title": "Infertility Solutions", "text": "Infertility can be challenging, but modern science offers hope. We'll examine its causes in both males and females, and then explore advanced Assisted Reproductive Technologies like IVF, ZIFT, and ICSI that help couples achieve parenthood."},
  {"title": "MTP & Rights", "text": "Finally, we discuss Medical Termination of Pregnancy, or MTP, and its legal aspects in India, including permissible limits and conditions. We'll also highlight the broader importance of reproductive rights and comprehensive education for informed choices in society."}
];
        let isPlaying = false;
        let speechSynth = window.speechSynthesis;

        switch3DScene();

        function startPresentation() {
            if (isPlaying) return;
            isPlaying = true;
            const btn = document.getElementById('start-btn');
            btn.innerHTML = '⏸'; btn.classList.add('playing');
            document.getElementById('status-label').innerText = "PLAYING";
            document.getElementById('sidebar').classList.add('visible');
            playScene(0);
        }

        function playScene(index) {
            if (index >= scenes.length) {
                const btn = document.getElementById('start-btn');
                btn.innerHTML = '▶'; btn.classList.remove('playing');
                document.getElementById('status-label').innerText = "FINISHED";
                isPlaying = false;
                return;
            }

            document.getElementById('slide-num').innerText = "SLIDE " + (index + 1) + " / " + scenes.length;
            document.getElementById('chapter-title').innerText = scenes[index].title;
            document.getElementById('transcript-text').innerText = '"' + scenes[index].text + '"';

            const utterance = new SpeechSynthesisUtterance(scenes[index].text);
            utterance.rate = 0.95; utterance.pitch = 1.05;
            const voices = speechSynth.getVoices();
            const preferredVoice = voices.find(v => v.name.includes('Google') || v.lang.includes('en-US'));
            if (preferredVoice) utterance.voice = preferredVoice;

            const startTime = Date.now();
            const estDurationMs = (scenes[index].text.length / 15) * 1000; 
            const progressInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const chunkProgress = Math.min(100, (elapsed / estDurationMs) * 100);
                const totalProgress = ((index + (chunkProgress/100)) / scenes.length) * 100;
                document.getElementById('progress').style.width = totalProgress + '%';
            }, 100);

            utterance.onend = () => {
                clearInterval(progressInterval);
                document.getElementById('progress').style.width = ((index + 1) / scenes.length) * 100 + '%';
                setTimeout(() => playScene(index + 1), 800); 
            };
            speechSynth.speak(utterance);
        }
    </script>
</body>
</html>