import { Router, type Request, type Response } from "express";
import {
  zStudentPostBody,
  zStudentPutBody,
  zStudentId,
} from "../libs/zodValidators.js";
import type { Student, Course, Enrollment } from "../libs/types.js";

// import database
import { students, courses, enrollments } from "../db/db.js";

const router = Router();

// DELETE /api/v2/enrollments
router.delete("/", (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.body;

    const studentIdStr = String(studentId);
        if (studentIdStr.length !== 9) {
            return res.status(400).json({
                success: false,
                message: "Student Id must contain 9 characters",
        });
    }
    const courseIdStr = String(courseId);
        if (courseIdStr.length !== 6) {
            return res.status(400).json({
                success: false,
                message: "Course Id must contain 6 characters",
        });
    }

    const found = enrollments.findIndex( (e) => e.studentId === studentId && e.courseId === courseId );

    // 3.2 ไม่พบข้อมูลในระบบ
    if (found === -1) {
      return res.status(404).json({
        success: false,
        message: "Enrollment does not exist",
      });
    }
    
    // 3.1 หากพบข้อมูล ลบออกจาก enrollments
    enrollments.splice(found, 1);

    return res.status(200).json({
      success: true,
      message: "Enrollment has been deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

export default router;