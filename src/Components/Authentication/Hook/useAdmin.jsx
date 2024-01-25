import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosPublic();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await axiosSecure.get(`/user/admin/${user.email}`);
        console.log(res.data);
        setIsAdmin(res.data?.admin || false);
        setIsAdminLoading(false);
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setIsAdminLoading(false);
      }
    };

    if (user) {
      fetchAdminStatus();
    } else {
      // If user is not authenticated, set isAdmin to false
      setIsAdmin(false);
      setIsAdminLoading(false);
    }
  }, [user, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
