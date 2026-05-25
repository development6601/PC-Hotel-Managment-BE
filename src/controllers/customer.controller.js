const authModel = require("../models/auth.models");
const customerModel = require("../models/customer.model");

async function customerDetail(req, res) {
  try {
    const { phoneNumber, gender, address, idProofNumber, status } = req.body;
    const existEmail = await customerModel.findOne({ email: req.user.email });

    if (existEmail) {
      return res.status(400).json({
        message: "ALready exist",
      });
    }
    const customer = await customerModel.create({
      userId: req.user._id,
      fullName: {
        firstName: req.user.fullName.firstName,
        lastName: req.user.fullName.lastName,
      },
      phoneNumber,
      gender,
      address,
      email: req.user.email,
      idProofNumber,
    });
    return res.status(200).json({
      message: "Successfully fill form",
      customer,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getCustomerDetail(req, res) {
  try {
    const user = req.user;

    const customer = await customerModel.findOne({ userId: user._id });

    const finalData = {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profileImg: user.profileImg,

      phoneNumber: customer?.phoneNumber || "",
      gender: customer?.gender || "",
      address: customer?.address || "",
      idProofNumber: customer?.idProofNumber || "",
      status: customer?.status || "",
    };

    return res.status(200).json({
      user: finalData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function updateCustomer(req, res) {
  try {
    const { fullName, phoneNumber, gender, address, email ,idProofNumber } = req.body;

    const userId = req.user._id;
    const image = req.file;

    // split full name
    const nameParts = fullName.trim().split(" ");
    

    const firstName = nameParts[0];

    const lastName = nameParts.slice(1).join(" ");

    let user = await authModel.findById(userId);

    user.fullName.firstName = firstName;
    user.fullName.lastName = lastName;
    user.email = email

    if (image) {
      user.profileImg = image.filename;
    }

    await user.save();

    
    let customer = await customerModel.findOne({ userId });

    if (!customer) {
      customer = await customerModel.create({
        userId,
        fullName: {
          firstName,
          lastName,
        },
        email: user.email,
        phoneNumber,
        gender,
        address,
        idProofNumber,
      });
    } else {
      customer.fullName.firstName = firstName;
      customer.fullName.lastName = lastName;

      customer.phoneNumber = phoneNumber;
      customer.email = email;
      customer.gender = gender;
      customer.address = address;
      customer.idProofNumber = idProofNumber;

      await customer.save();
    }

    return res.status(200).json({
      message: "Customer Updated Successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        profileImg: user.profileImg,
        phoneNumber: customer.phoneNumber,
        gender: customer.gender,
        address: customer.address,
        idProofNumber: customer.idProofNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
async function getAllCustomer(req, res) {
  try {
    const { role } = req.user;

    if (role !== "Admin") {
      return res.status(401).json({
        message: "Only Admin can Access this.",
      });
    }

    const customer = await customerModel
      .find()
      .populate({
        path: "userId",
        match: { role: "user" },
        select: "profileImg role",
      });

    const onlyUserCustomers = customer.filter((item) => item.userId !== null);

    res.status(200).json({
      customer: onlyUserCustomers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = { customerDetail, getCustomerDetail, updateCustomer ,getAllCustomer};