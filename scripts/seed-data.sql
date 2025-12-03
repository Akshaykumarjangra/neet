-- Seed initial achievements
INSERT INTO achievements (name, description, icon, category, xp_reward, unlock_condition, rarity) VALUES
  ('First Steps', 'Complete your first question', 'trophy', 'beginner', 50, '{"type":"questions_solved","target":1}', 'common'),
  ('Quick Learner', 'Solve 10 questions correctly', 'star', 'progress', 100, '{"type":"questions_solved","target":10}', 'common'),
  ('Physics Master', 'Score 90% or above in Physics test', 'atom', 'subject', 200, '{"type":"test_score","target":90,"subject":"Physics"}', 'rare'),
  ('Chemistry Genius', 'Score 90% or above in Chemistry test', 'flask', 'subject', 200, '{"type":"test_score","target":90,"subject":"Chemistry"}', 'rare'),
  ('Biology Expert', 'Score 90% or above in Biology test', 'dna', 'subject', 200, '{"type":"test_score","target":90,"subject":"Biology"}', 'rare'),
  ('Week Warrior', 'Maintain a 7-day study streak', 'fire', 'streak', 150, '{"type":"streak","target":7}', 'uncommon'),
  ('Month Champion', 'Maintain a 30-day study streak', 'crown', 'streak', 500, '{"type":"streak","target":30}', 'epic'),
  ('Century Club', 'Solve 100 questions', 'medal', 'progress', 300, '{"type":"questions_solved","target":100}', 'rare'),
  ('Perfect Score', 'Get 100% in any mock test', 'star', 'achievement', 250, '{"type":"perfect_test"}', 'rare'),
  ('Early Bird', 'Study before 8 AM for 5 days', 'sunrise', 'habit', 100, '{"type":"early_study","target":5}', 'uncommon')
ON CONFLICT (name) DO NOTHING;

-- Seed content topics
INSERT INTO content_topics (subject, class_level, topic_name, ncert_chapter) VALUES
  ('Physics', 'Class 11', 'Physical World', 'Chapter 1'),
  ('Physics', 'Class 11', 'Units and Measurements', 'Chapter 2'),
  ('Physics', 'Class 11', 'Motion in a Straight Line', 'Chapter 3'),
  ('Physics', 'Class 11', 'Motion in a Plane', 'Chapter 4'),
  ('Physics', 'Class 12', 'Electric Charges and Fields', 'Chapter 1'),
  ('Physics', 'Class 12', 'Electrostatic Potential', 'Chapter 2'),
  ('Chemistry', 'Class 11', 'Some Basic Concepts of Chemistry', 'Chapter 1'),
  ('Chemistry', 'Class 11', 'Structure of Atom', 'Chapter 2'),
  ('Chemistry', 'Class 11', 'Chemical Bonding', 'Chapter 4'),
  ('Chemistry', 'Class 12', 'Solid State', 'Chapter 1'),
  ('Chemistry', 'Class 12', 'Solutions', 'Chapter 2'),
  ('Botany', 'Class 11', 'The Living World', 'Chapter 1'),
  ('Botany', 'Class 11', 'Biological Classification', 'Chapter 2'),
  ('Botany', 'Class 11', 'Plant Kingdom', 'Chapter 3'),
  ('Zoology', 'Class 11', 'Animal Kingdom', 'Chapter 4'),
  ('Zoology', 'Class 11', 'Structural Organisation in Animals', 'Chapter 5'),
  ('Zoology', 'Class 12', 'Reproduction in Organisms', 'Chapter 1'),
  ('Zoology', 'Class 12', 'Human Reproduction', 'Chapter 3')
ON CONFLICT DO NOTHING;

-- Seed sample questions
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty, tags) VALUES
  (1, 'What is the SI unit of force?', 'Newton', 'Joule', 'Watt', 'Pascal', 'A', 'The SI unit of force is Newton (N), named after Sir Isaac Newton. It is defined as the force required to accelerate a mass of 1 kg at 1 m/s².', 'easy', '["units","mechanics"]'),
  (2, 'Which of the following is a fundamental quantity?', 'Force', 'Energy', 'Length', 'Velocity', 'C', 'Length is a fundamental quantity in physics. Fundamental quantities are those that cannot be expressed in terms of other physical quantities.', 'easy', '["units","measurements"]'),
  (3, 'The dimensional formula of energy is:', 'ML²T⁻²', 'MLT⁻²', 'ML²T⁻¹', 'M²LT⁻²', 'A', 'Energy has the dimensional formula [ML²T⁻²]. This can be derived from the work-energy theorem where Work = Force × Displacement.', 'medium', '["dimensions","energy"]'),
  (5, 'According to Coulomb''s law, the force between two charges is:', 'Directly proportional to the product of charges', 'Inversely proportional to distance', 'Inversely proportional to square of distance', 'Both A and C', 'D', 'Coulomb''s law states that F = k(q₁q₂)/r². The force is directly proportional to the product of charges and inversely proportional to the square of the distance between them.', 'medium', '["electrostatics","coulombs_law"]'),
  (7, 'Which of the following is NOT a postulate of Dalton''s atomic theory?', 'Atoms are indivisible', 'Atoms of same element are identical', 'Atoms can be created or destroyed', 'Atoms combine in simple whole number ratios', 'C', 'According to the law of conservation of mass, atoms cannot be created or destroyed in a chemical reaction. This is a fundamental principle that Dalton''s theory upholds.', 'easy', '["atomic_theory","chemistry_basics"]'),
  (8, 'The maximum number of electrons in M shell is:', '8', '18', '32', '2', 'B', 'The maximum number of electrons in any shell is given by 2n², where n is the shell number. For M shell (n=3), maximum electrons = 2(3)² = 18.', 'easy', '["atomic_structure","electron_configuration"]')
ON CONFLICT DO NOTHING;

-- Seed daily challenges for current date
INSERT INTO daily_challenges (challenge_date, title, description, target_type, target_value, xp_reward, subject) VALUES
  (NOW(), 'Morning Practice', 'Solve 10 questions in any subject', 'questions_solved', 10, 100, NULL),
  (NOW(), 'Physics Focus', 'Complete 5 Physics questions with 80% accuracy', 'subject_accuracy', 80, 150, 'Physics'),
  (NOW(), 'Speed Challenge', 'Complete a 10-question test in under 10 minutes', 'timed_test', 10, 200, NULL)
ON CONFLICT DO NOTHING;

-- Create a Battle Pass season
INSERT INTO battle_pass_seasons (season_name, start_date, end_date, total_tiers, is_active) VALUES
  ('NEET 2026 Prep Season 1', NOW(), NOW() + INTERVAL '90 days', 50, TRUE)
ON CONFLICT DO NOTHING;

-- Add some battle pass tiers
INSERT INTO battle_pass_tiers (season_id, tier_number, xp_required, free_reward, premium_reward)
SELECT 1, tier, tier * 100, 
  json_build_object('type', 'xp_boost', 'value', tier * 10),
  json_build_object('type', 'premium_item', 'value', tier * 20)
FROM generate_series(1, 10) AS tier
ON CONFLICT DO NOTHING;
