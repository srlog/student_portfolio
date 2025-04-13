const { Admin, Student, Achievement } = require("../models");
const { organizeAchievementsStudent } = require("./achievement.controller");

const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.user.id,
      },
    });
    const achievements = await Achievement.findAll({
      where: {
        student_id: req.user.id,
      },
    });

    student.dataValues.achievements = organizeAchievementsStudent(achievements); // Add achievements
    res.status(200).json({
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentProfileAdmin = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id,
      },
    });
    const achievements = await Achievement.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    student.dataValues.achievements = organizeAchievementsStudent(achievements); // Add achievements
    res.status(200).json({
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json({
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const {
      name,
      gender,
      fathers_name,
      date_of_birth,
      residential_address,
      mobile,
      parents_mobile_no,
      aadhar_card_no,
      department,
      year,
      section,
      cgpa,
      bio,
      portfolio,
      github_profile,
      linkedin_profile,
      profile_picture,
    } = req.body;

    const student = await Student.findOne({
      where: {
        id,
      },
    });
    student.name = name;
    student.gender = gender;
    student.fathers_name = fathers_name;
    student.date_of_birth = date_of_birth;
    student.residential_address = residential_address;
    student.mobile = mobile;
    student.parents_mobile_no = parents_mobile_no;
    student.aadhar_card_no = aadhar_card_no;
    student.department = department;
    student.year = year;
    student.section = section;
    student.cgpa = cgpa;
    student.bio = bio;
    student.portfolio = portfolio;
    student.github_profile = github_profile;
    student.linkedin_profile = linkedin_profile;
    student.profile_picture = profile_picture;

    await student.save();

    res.status(200).json({
      message: "Student profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { department } = req.body;

    const admin = await Admin.findOne({
      where: {
        id,
      },
    });
    admin.department = department;
    await admin.save();

    res.status(200).json({
      message: "Admin profile updated successfully",
    });
  } catch (error) {
    console.error({ message: "Error updating admin profile: ", error });
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getStudentProfile,
  getStudentProfileAdmin,
  getAdminProfile,
  updateStudentProfile,
  updateAdminProfile,
};
