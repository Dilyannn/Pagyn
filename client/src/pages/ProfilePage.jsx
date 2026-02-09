import { useState, useEffect } from "react";
import { User, Mail, Save } from "lucide-react";
import toast from "react-hot-toast";

import DashboardMainLayout from "../components/layout/DashboardMainLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../utils/api";

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
        username: formData.username,
      });

      // Update context with new user data
      updateUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardMainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-500">Manage your account details.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              icon={User}
              placeholder="Your full name"
            />

            <InputField
              label="Email"
              name="email"
              value={formData.email}
              icon={Mail}
              placeholder="Your email address"
              readOnly
              className="opacity-75"
              title="Email cannot be changed"
            />

            <div className="flex justify-end pt-2">
              <Button className="cursor-pointer" type="submit" isLoading={loading} icon={Save}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardMainLayout>
  );
}

export default ProfilePage;