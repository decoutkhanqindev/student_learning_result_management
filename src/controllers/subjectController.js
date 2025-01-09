const subjectService = require("../services/subjectService");

class SubjectController {
  static async getAllSubjectsController(req, res) {
    try {
      console.log("\n>>> getAllSubjectsController is called.");
      const subjects = await subjectService.getAllSubjectsService();
      if (!subjects.length) {
        res.status(404).json({ message: "No subject found here." });
      } else {
        res.status(200).json(subjects);
      }
    } catch (error) {
      console.log(
        "\n>>> getAllSubjectsController have error: " + error.message
      );
      res.status(500).json({ message: error.message });
    }
  }

  static async getSubjectByIdController(req, res) {
    try {
      console.log("\n>>> getSubjectByIdController is called.");
      let id = req.params.id;
      const subject = await subjectService.getSubjectByIdService(id);
      if (!subject) {
        res.status(404).json({ message: `No subject with ${id} found.` });
      } else {
        res.status(200).json(subject);
      }
    } catch (error) {
      console.log(
        "\n>>> getSubjectByIdController have error: " + error.message
      );
      res.status(500).json({ message: error.message });
    }
  }

  static async addSubjectController(req, res) {
    try {
      console.log("\n>>> addSubjectController is called.");
      const subjectData = req.body;
      if (
        !subjectData._id ||
        !subjectData.subjectName ||
        !subjectData.teacher
      ) {
        res.status(400).json({ message: "Incorrect subject data in body." });
      } else {
        const currentSubject = await subjectService.getSubjectByIdService(
          subjectData._id
        );
        if (!currentSubject) {
          const newSubject = await subjectService.addSubjectService(
            subjectData
          );
          res.status(201).json(newSubject);
        } else {
          res.status(400).json({
            message: `A subject with ${subjectData._id} already exists.`
          });
        }
      }
    } catch (error) {
      console.log("\n>>> addSubjectController have error: " + error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateSubjectByIdController(req, res) {
    try {
      console.log("\n>>> updateSubjectByIdController is called.");
      let id = req.params.id;
      const subjectData = req.body;
      const currentSubject = await subjectService.getSubjectByIdService(id);
      if (!currentSubject) {
        res.status(404).json({ message: `No student with ${id} found.` });
      } else {
        const updatedSubject = await subjectService.updateSubjectByIdService(
          id,
          subjectData
        );
        res.status(200).json(updatedSubject);
      }
    } catch (error) {
      console.log(
        "\n>>> updateSubjectByIdController have error: " + error.message
      );
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteSubjectByIdController(req, res) {
    try {
      console.log("\n>>> deleteSubjectByIdController is called.");
      let id = req.params.id;
      const currentSubject = await subjectService.getSubjectByIdService(id);
      if (!currentSubject) {
        res.status(404).json({ message: `No subject with ${id} found.` });
      } else {
        const deletedStudent = await subjectService.deleteSubjectByIdService(
          id
        );
        res.status(200).json(deletedStudent);
      }
    } catch (error) {
      console.log(
        "\n>>> deleteSubjectByIdController have error: " + error.message
      );
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = SubjectController;

// try-catch template
// try {
//   console.log("\n>>> functioName is called.");
// } catch (error) {
//   console.log("\n>>> functioName have error: " + error.message);
//   res.status(500).json({ message: error.message });
// }
