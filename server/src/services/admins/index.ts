import { env } from "process";
import Admin, { IAdminModel } from "../../models/admins/Admin";
import {
  entityEmailDoesNotExistError,
  entityIdDoesNotExistError,
} from "../../utils/ErrorMessages";
import { sendEmail } from "../../utils/email";

export const findAllAdmins = async () => await Admin.find();

export const findAdminById = async (id: string, elementsToSelect?: any) => {
  const PromisedAdmin = Admin.findById(id);
  if (!elementsToSelect)
    return await PromisedAdmin.select({ _id: 1, password: 1 });
  return await PromisedAdmin.select(elementsToSelect);
};
export const findAdminByUsername = async (username: string) =>
  await Admin.findOne({ username }).select({ _id: 1, password: 1 });

export const findAdminByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const PromisedAdmin = Admin.findOne({ email });
  if (!elementsToSelect)
    return await PromisedAdmin.select({ _id: 1, password: 1 });
  return await PromisedAdmin.select(elementsToSelect);
};

export const deleteAdminById = async (id: string) =>
  await Admin.findByIdAndDelete(id);

export const createNewAdmin = async (username: string, password: string) => {
  const newAdmin = new Admin({ username, password });
  await newAdmin.save();
};

export const updateAdminPasswordByEmail = async (
  email: string,
  newPassword: string
) => {
  const admin = await findAdminByEmail(email);
  if (!admin) {
    throw new Error(entityEmailDoesNotExistError("admin", email));
  }
  await updateAdminPassword(admin, newPassword);
};

export const updatePasswordById = async (
  adminId: string,
  newPassword: string
) => {
  const admin = await findAdminById(adminId);
  if (!admin) {
    throw new Error(entityIdDoesNotExistError("admin", adminId));
  }
  await updateAdminPassword(admin, newPassword);
};
export const updateAdminPassword = async (
  admin: IAdminModel,
  newPassword: string
) => {
  admin.password = newPassword;
  await admin.save();
};

export const sendRejectionEmailToPharmacist = async (
  pharmacistName: string,
  pharmacistEmail: string
) => {
  const rejectionmessage = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Rejection</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #e74c3c;
      margin-bottom: 20px;
    }

    p {
      color: #555;
      line-height: 1.6;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      color: #888;
      font-size: 0.8rem;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Application Update</h1>
    <h3>Dear ${pharmacistName},</h3>
    <p>We appreciate your interest in the position of Pharmacist, and we carefully reviewed your application. After thorough consideration, we regret to inform you that we have chosen not to move forward with your application at this time.</p>
 
    <p>Whilst we are unable to provide additional details about this decision, we would like to keep in touch regarding future job opportunities. We want to thank you for taking the time to apply and express our gratitude for your interest in joining our team. We encourage you to apply for future opportunities with us and wish you success in your career.</p>
    <p>Thank you again for your interest in working at El7a2ni.</p>
    <p>Sincerely,</p>
    <strong>El7a2ni Recruitment Team</strong>
  </div>

  <div class="footer">
    <p>This is an automated email. Please do not reply.</p>
    <br> <p> © 2023 El7a2ni. All rights reserved.</p>
  </div>
</body>
</html>`;

  await sendEmail({
    to: pharmacistEmail,
    subject: "Application Update",
    html: rejectionmessage,
    text: "Application Update",
    from: "El7a2nii Pharmacy",
  })
    .then(() => {
      console.log("Email sent successfully");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const sendAcceptanceEmailToPharmacist = async (
  pharmacistName: string,
  pharmacistEmail: string
) => {
  const approvalmessage = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Acceptance - Pharmacist Position</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
      }
  
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #2ecc71;
        margin-bottom: 20px;
      }
  
      p {
        color: #555;
        line-height: 1.6;
      }
  
      .cta-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #2ecc71;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
  
      .footer {
        margin-top: 20px;
        text-align: center;
        color: #888;
        font-size: 0.8rem;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <h1>Job Acceptance - Pharmacist Position</h1>
      <h3>Dear ${pharmacistName},</h3>
      <p>We are delighted to inform you that your application for the Pharmacist position at 'El7a2ni' has been accepted. Congratulations!</p>
      <p>We were impressed with your qualifications and believe that you will be a valuable addition to our team. We look forward to working with you and achieving great success together.</p>
      <p>To proceed with the onboarding process, please complete the necessary documentation and provide any additional information required. Your prompt attention to these matters will help ensure a smooth transition into your new role.</p>
      <p>Click the button below to access the required documents and complete the remaining information:</p>
      <a class="cta-button" href="${
        env.FRONT_END_URL || "http://localhost:5173"
      }/pharmacist/complete-additional-info">Complete Onboarding</a>
      <p>If you have any questions or need further assistance, feel free to reply to this email or contact us.</p>
      <p>Welcome to the 'El7a2ni' team, and we look forward to a successful collaboration!</p>
      <p>Best regards,</p>
      <strong>'El7a2ni Recruitment Team'</strong>
    </div>
  
    <div class="footer">
      <p>This is an automated email. © 2023 El7a2ni. All rights reserved.</p>
    </div>
  </body>
  </html>`;
  await sendEmail({
    to: pharmacistEmail,
    subject: "Job Update - Pharmacist Position",
    html: approvalmessage,
    text: "Job Acceptance",
    from: "El7a2ni Pharmacy",
  })
    .then(() => {
      console.log("Email sent successfully");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
