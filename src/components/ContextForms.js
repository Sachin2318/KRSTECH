import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import ErrorMessage from "./ErrorMessage"
function ContextForms() {
    const [users, setUsers] = useState([])
    const { reset, handleSubmit, register,  formState: { errors } } = useForm()


    function addUser(newUser) {
        console.log(newUser)
        let ary = users.concat({ ...newUser, id: users.length + 1 })
        setUsers(ary)
        saveLocalData([...ary]);
        reset()
    }
    const saveLocalData = (data) => {
        localStorage.setItem("users", JSON.stringify(data));
    };
    const getLocalTodos = () => {
        if (localStorage.getItem("users") === null) {
            localStorage.setItem("users", JSON.stringify([]));
        }
        else {
            let todoLocal = JSON.parse(localStorage.getItem("users"));
            setUsers(todoLocal);
        }
    };

    useEffect(() => {
        getLocalTodos();
    }, []);

    return (
        <div className="container px-5 sm:px-0 my-10 mx-auto max-w-xl">
            <div>
                <form
                    onSubmit={handleSubmit(addUser)}
                    className="bg-white rounded p-5 shadow mt-4"
                >
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="input"
                            id="name"
                            type="text"
                            placeholder="Title"
                            autoComplete="off"
                        />
                        <ErrorMessage error={errors.title && "Title is required."} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            {...register("email", { required: true })}
                            className="input"
                            name="email"
                            id="email"
                            type="email"
                            autoComplete="off"
                            placeholder="bob@example.com"
                        />
                        <ErrorMessage error={errors.email && "Email is required."} />

                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Description</label>
                        <textarea {...register("description")} className="input" id="description" placeholder="Description" name="description" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Range</label>
                        <input type={"range"} name="range" {...register("range", { required: true, min: 0, max: 100 })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Valid</label>
                        <input type={"checkbox"} name="valid" {...register("valid")} id="value" />
                    </div>

                    <div className="flex justify-end border-t mt-3 pt-5">
                        <button
                            type="button"
                            onClick={reset}
                            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                        >
                            Reset
                        </button>
                        <button
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>

            <div
                className="bg-white rounded p-5 shadow mt-4"
            >
                <h2 className="text-xl">Users ({users.length})</h2>

                <table className="w-full mt-2">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2 w-150">ID</th>
                            <th className="text-left py-2 w-150">Title</th>
                            <th className="text-left py-2 w-150">Email</th>
                            <th className="text-left py-2 w-150">Description</th>
                            <th className="text-left py-2 w-150">Range</th>
                            <th className="text-left py-2 w-150">Valid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            if (user.valid && user.range > 30 && user.range < 70) {
                                return (
                                    <tr key={user.id} className="border-t">
                                        <td className="py-2 w-150">{user.id}</td>
                                        <td className="py-2 w-150">{user.title}</td>
                                        <td className="py-2 w-150">{user.email}</td>
                                        <td className="py-2 w-150" style={{ width: "150px" }}>{user.description} </td>
                                        <td className="py-2 w-150">{user.range}</td>
                                        <td className="py-2 w-150">{user.valid == false ? "false" : "true"}</td>
                                    </tr>
                                )
                            }
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



export default ContextForms
