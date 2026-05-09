const fs = require("fs");
const path = require("path");

// Yeh helper function file lega aur uska Public URL return karega
exports.uploadFile = async (fileBuffer, originalName, folderName = "general") => {
  try {
    const filename = `${Date.now()}-${originalName.replace(/\s/g, "-")}`;
    
    // ==========================================
    // CURRENT LOGIC: Local Server Pe Save Karna
    // ==========================================
    const uploadPath = path.join(__dirname, `../public/uploads/${folderName}`);
    
    // Agar folder nahi hai toh bana do
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, filename);
    
    // File ko local disk par write kar rahe hain
    fs.writeFileSync(filePath, fileBuffer);

    // Frontend ko dikhane ke liye Local URL return kar do
    return `${process.env.BASE_URL}/uploads/${folderName}/${filename}`;

    // ==========================================
    // FUTURE LOGIC: AWS S3 Pe Save Karna 
    // (Jab S3 lagana ho, toh upar ka code comment karna aur isko active kar dena)
    // ==========================================
    /*
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folderName}/${filename}`,
      Body: fileBuffer,
      ContentType: "image/jpeg" // ya mimetype
    };
    const s3Result = await s3.upload(s3Params).promise();
    return s3Result.Location; // S3 ka direct URL mil jayega
    */

  } catch (error) {
    throw new Error("File upload failed: " + error.message);
  }
};