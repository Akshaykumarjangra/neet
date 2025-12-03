# Quick Start: Adding Real NEET Questions

## 🚀 Fastest Way to Add Questions

### Method 1: Bulk Import (Recommended for New Questions)

1. **Copy the template:**
   ```bash
   cp question-template.json my-physics-questions.json
   ```

2. **Edit the file** with your questions (keep the same JSON structure)

3. **Import:**
   ```bash
   npx tsx bulk-import-questions.ts my-physics-questions.json
   ```

### Method 2: Replace Placeholders (Recommended for Existing Questions)

1. **Find placeholders:**
   ```bash
   npx tsx find-placeholder-questions.ts
   ```
   This creates `placeholder-questions-to-fill.json`

2. **Edit the file** - Replace the template text with real questions

3. **Batch update:**
   ```bash
   npx tsx batch-update-questions.ts placeholder-questions-to-fill.json
   ```

## 📝 Question Format Example

```json
{
  "topicId": 1,
  "questionText": "A car accelerates from rest to 20 m/s in 5 seconds. What is its acceleration?",
  "options": [
    "2 m/s²",
    "4 m/s²",
    "5 m/s²",
    "10 m/s²"
  ],
  "correctAnswer": "B",
  "difficultyLevel": 1,
  "solutionDetail": "Using the formula a = (v - u) / t, where v = 20 m/s, u = 0 m/s, and t = 5 s, we get a = 20/5 = 4 m/s²",
  "solutionSteps": [
    "Initial velocity (u) = 0 m/s (starts from rest)",
    "Final velocity (v) = 20 m/s",
    "Time (t) = 5 seconds",
    "Using a = (v - u) / t",
    "a = (20 - 0) / 5 = 4 m/s²"
  ],
  "relatedTopics": ["Acceleration", "Kinematics", "Equations of Motion"],
  "tags": ["neet", "physics", "kinematics", "acceleration"]
}
```

## 🎯 Topic IDs Quick Reference

| ID | Subject | Topic |
|----|---------|-------|
| 1 | Physics | Kinematics |
| 2 | Physics | Laws of Motion |
| 3 | Physics | Electrostatics |
| 4 | Chemistry | Atomic Structure |
| 5 | Chemistry | Chemical Bonding |
| 6 | Chemistry | Electrochemistry |
| 7 | Botany | Cell Structure and Function |
| 8 | Botany | Genetics |
| 9 | Botany | Plant Physiology |
| 10 | Zoology | Evolution |
| 11 | Zoology | Human Physiology |
| 12 | Zoology | Reproduction |

## ✅ Checklist Before Importing

- [ ] Topic ID is correct (1-12)
- [ ] Question text is clear and complete
- [ ] Exactly 4 options (A, B, C, D)
- [ ] Correct answer is specified (A, B, C, or D)
- [ ] Difficulty level is 1, 2, or 3
- [ ] Solution explanation is detailed
- [ ] Solution steps are clear
- [ ] Related topics are listed
- [ ] Appropriate tags are added

## 🔄 Workflow Example

Let's add 10 Physics Kinematics questions:

```bash
# 1. Create your questions file
nano physics-kinematics.json

# 2. Add your questions (use question-template.json as reference)

# 3. Import them
npx tsx bulk-import-questions.ts physics-kinematics.json

# 4. Verify in the app
# Go to Practice page → Select Physics → Select Kinematics topic
```

## 🎓 Tips for Quality Questions

1. **Clear and Concise**: Question should be easy to understand
2. **NEET-Style**: Follow actual NEET exam patterns
3. **Detailed Solutions**: Include step-by-step explanations
4. **Proper Difficulty**: 
   - Level 1: Direct formula application
   - Level 2: 2-3 step problems
   - Level 3: Complex, multi-concept problems
5. **Relevant Tags**: Add tags for easy filtering later

## 📊 Track Your Progress

Check how many questions you've added:

```bash
# Total questions
psql postgresql://user@localhost:5432/neet_prep -c "SELECT COUNT(*) FROM questions;"

# Real vs Placeholder
npx tsx find-placeholder-questions.ts
```

## 🆘 Common Issues

**Issue**: "Cannot find module"
**Fix**: Make sure you're in the project root directory

**Issue**: "Database connection failed"
**Fix**: Ensure PostgreSQL is running and DATABASE_URL in .env is correct

**Issue**: "Invalid JSON"
**Fix**: Validate your JSON at jsonlint.com before importing

---

**Ready to start?** Run this command to see your current status:
```bash
npx tsx find-placeholder-questions.ts
```
