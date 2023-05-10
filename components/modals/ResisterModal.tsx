
import { useCallback, useState } from "react";
// import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useResisterModal from "@/hooks/useResisterModal";
import { signIn } from "next-auth/react";

import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";
import toast from "react-hot-toast";

const ResisterModal = () => {
  const loginModal = useLoginModal();
  const resisterModal = useResisterModal();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);


  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }
    resisterModal.onClose()

    loginModal.onOpen()
  },[resisterModal,loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      
      
      // TODO ADD RESISTER AND LOGIN
      await axios.post("/api/resister", {
        email,
        password,
        username,
        name
      });
      toast.success("Account Created Successfully")
      
      signIn("credentials", {
        email,
        password
      });
      
      // To make everyting empty after the user hitting the submit button
      setEmail("");
      setPassword("");
      setName("");
      setUsername("");
      
      resisterModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
      
    } finally {
      setIsLoading(false);
    }
  }, [resisterModal,email,password,username,name]);  // Error shows here as i have not added the dev dependencies at the end



  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )


  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span
          onClick={onToggle}
          className="
          text-white 
          cursor-pointer
          hover:underline
          "
        > Sign In</span>
        </p>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={resisterModal.isOpen}
      title="Create an Account"
      actionLabel="Resister "
      onClose={resisterModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default ResisterModal;
