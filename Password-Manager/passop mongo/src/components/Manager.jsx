import React from "react";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setpasswordArray(passwords)


  }

  useEffect(() => {
    getPasswords();
  }, [])
  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    navigator.clipboard.writeText(text)
  }
  const ref = useRef();
  const passwordRef = useRef();
  const showPassword = () => {
    passwordRef.current.type = "text"


    if (ref.current.src.includes("/icons/eye2.svg")) {
      ref.current.src = "/icons/eye.svg"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "/icons/eye2.svg"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: form.id })
      })
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })
      setform({ site: "", username: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
    else {
      toast('Error: Password not saved!');
    }

  }
  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      })
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }
  const editPassword = (id) => {
    setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">You own Password Manager</p>
        <div className="flex flex-col text-black items-center p-4 gap-8">
          <input value={form.site} onChange={handleChange} name="site" id="site" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" placeholder="Enter website URL" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} name="username" id="username" onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} name="password" onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1" type="password" id="password" />
              <span className="absolute right-2 top-2 cursor-pointer" onClick={showPassword} >
                <img ref={ref} src="/icons/eye.svg" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className="justify-center flex items-center rounded-full border border-green-900 gap-2 bg-green-400 hover:bg-green-300 px-4 py-2 w-fit">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            >
            </lord-icon>Save</button>
        </div>
        <div className="passwords pb-10">
          <h2 className="font-bold text-2xl">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-fixed w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className="flex gap-2 justify-center items-center py-2 border border-white text-center "><a href={item.site} target="_blank">{item.site}</a>
                    <div className="lordicon cursor-pointer" onClick={() => { copyText(item.site) }} >
                      <lord-icon
                        style={{ "width": "20px", " height": "20px", "paddingTop": "3px" }}
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover">
                      </lord-icon>
                    </div>
                  </td>

                  <td className="py-2 border border-white text-center ">
                    <div className="flex justify-center items-center gap-2">
                      <span>
                        {item.username}
                      </span>
                      <div className="lordicon cursor-pointer" onClick={() => { copyText(item.username) }} >
                        <lord-icon
                          style={{ "width": "20px", " height": "20px", "paddingTop": "3px" }}
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 border border-white text-center ">
                    <div className="flex justify-center items-center gap-2">
                      <span>
                        {"*".repeat(item.password.length)}
                      </span>
                      <div className="lordicon cursor-pointer" onClick={() => { copyText(item.password) }} >
                        <lord-icon
                          style={{ "width": "20px", " height": "20px", "paddingTop": "3px" }}
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className=" py-2 border border-white text-center ">
                    <span className="cursor-pointer px-1" onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/vysppwvq.json"
                        trigger="hover"
                        state="hover-line"
                        colors="primary:#000000,secondary:#000000"
                        style={{ "width": "24px", "height": "24px" }}>
                      </lord-icon>
                    </span>
                    <span className="cursor-pointer px-1" onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "24px", "height": "24px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}

            </tbody>
          </table>}

        </div>
      </div>

    </>

  );
};

export default Manager;
