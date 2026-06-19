const testQuestions = Array.from({length: 200}, (_, i) => ({id: i, data: `data${i}`}));
const questionIds = Array.from({length: 200}, (_, i) => 199 - i);

console.time('find');
const orderedQuestions1 = questionIds.map(id => testQuestions.find(q => q.id === id));
console.timeEnd('find');

console.time('map');
const questionMap = new Map(testQuestions.map(q => [q.id, q]));
const orderedQuestions2 = questionIds.map(id => questionMap.get(id));
console.timeEnd('map');
