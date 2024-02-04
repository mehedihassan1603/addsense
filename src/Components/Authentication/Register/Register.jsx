import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../Hook/useAxiosPublic";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const axiosPublic = useAxiosPublic();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log("Selected Image:", selectedImage);
    const photoUrl = selectedImage?.name || null;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phoneNumber = e.target.phoneNumber.value;
    const gender = e.target.gender.value;
    const address = e.target.address.value;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
    } else {
      setPasswordError("");

      try {
        const checkNumber = await axiosPublic.get("/userinfo");
        console.log(checkNumber.data);
        const phoneNumberExists = checkNumber.data.some(
          (user) => user.phoneNumber === phoneNumber
        );
        console.log(phoneNumberExists);

        if (phoneNumberExists) {
          toast.error(
            "Phone number already in use. Please use a different one.",
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            }
          );
        } else {
          if (selectedImage) {
            // Upload the image to the server
            const formData = new FormData();
            formData.append('image', selectedImage);
        
            try {
              const imageUploadResponse = await axiosPublic.post('/upload-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
        
              const imageUrl = imageUploadResponse.data.imageUrl;
        
              // Use imageUrl in your registration or save it to the user profile
              // ...
        
              console.log('Image uploaded successfully:', imageUrl);
        
              // Now you can use `imageUrl` to display the image on your frontend
              // For example, update the state with the imageUrl
              setUploadedImageUrl(imageUrl);
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          }
          console.log(uploadedImageUrl)
          const auth = getAuth();
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: name,
          });

          await axiosPublic.post("/userinfo", {
            name: name,
            userEmail: email,
            photoURL: uploadedImageUrl,
            password: password,
            phoneNumber: phoneNumber,
            gender: gender,
            address: address,
            count: 0,
            rate: 0,
          });

          console.log("User profile updated successfully.");
          toast.success("Account created successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            e.target.reset();
            navigate("/profile/profile");
          }, 2000);
        }
        
  
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-8/12">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Create Account
        </h1>
        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
          <div className=" mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex items-center">
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"50px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button onClick={() => setSelectedImage(null)}>Remove</button>
              </div>
            )}

            <br />
            <br />

            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
          <div className=" mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className=" mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          <div className=" mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              name="phoneNumber"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4 col-span-2">
            <label
              htmlFor="district"
              className="block text-gray-700 font-medium"
            >
              Address
            </label>
            <input
              type="textarea"
              id="address"
              placeholder="Address"
              name="address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="col-span-2">
            <div className="mt-6">
              <button
                type="submit"
                className="w-full block bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
              >
                Register
              </button>
            </div>
            <p className="mt-2 text-center">
              Already have an Account? Please{" "}
              <span className="text-blue-500">
                <Link to="/login">Login.</Link>
              </span>
            </p>
          </div>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Register;
