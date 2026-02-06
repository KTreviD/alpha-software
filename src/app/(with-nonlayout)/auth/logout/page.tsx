"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "src/slices/user";
import { usePostLogoutMutation } from "src/slices/api/apiSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUserPost] = usePostLogoutMutation();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutUserPost();
        dispatch(logoutUser());
      } catch (err) {
        console.error(err);
      } finally {
        router.push("/auth/login");
      }
    };

    logout();
  }, [dispatch, logoutUserPost, router]);

  return (
    <div
      id="status"
      className="d-flex align-items-center justify-content-center"
    >
      <div
        className="spinner-border text-primary m-auto"
        style={{ background: "red", width: "20vw" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
