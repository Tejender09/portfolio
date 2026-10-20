const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const RESUME_DIR = path.join(__dirname, '../../private/resumes');

router.get('/pdf', (req, res) => {
  const filePath = path.join(RESUME_DIR, 'resume.pdf');
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'PDF resume not found' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Tejender_Singh_Shekhawat_Resume.pdf"');
  res.sendFile(filePath);
});

router.get('/docx', (req, res) => {
  const filePath = path.join(RESUME_DIR, 'resume.docx');
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'DOCX resume not found' });
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename="Tejender_Singh_Shekhawat_Resume.docx"');
  res.sendFile(filePath);
});

module.exports = router;
