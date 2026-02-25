import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { validationSchema } from "../utils/ValidationSchemas";
import { useState } from "react";

const ManualWriting = () => {

    const [emailDetails, setEmailDetails] = useState(null)
    const { register,
        watch,
        control,
        handleSubmit,
        formState: {
            errors
        } } = useForm({
            defaultValues: {
                clientsName: "",
                projectName: "",
                completedTasks: [{ completedTask: "" }],
                remainingTasks: [{ remainingTask: "" }],
                queries: [{ task: "" }],
                notes: [{ note: "" }],
                writtersName: ""
            },
            resolver: yupResolver(validationSchema)
        });
    // console.log(errors)
    // todo: date and time

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const todayDate = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const emailSubmit = (values) => {
        // console.log(values)
        setEmailDetails(values);
    }

    // console.log(emailDetails ? emailDetails : null)

    // ! Queries Field Array
    const {
        fields: queriesFields,
        append: appendQuery,
        remove: removeQuery,
    } = useFieldArray({
        control,
        name: "queries",
    });

    //! Completed Field Array
    const {
        fields: completedFields,
        append: appendCompleted,
        remove: removeCompleted,
    } = useFieldArray({
        control,
        name: "completedTasks",
    });

    //! Remaining Field Array
    const {
        fields: remainingFields,
        append: appendRemaining,
        remove: removeRemaining,
    } = useFieldArray({
        control,
        name: "remainingTasks",
    });

    //! Notes Field Array
    const {
        fields: notesField,
        append: appendNotes,
        remove: removeNotes,
    } = useFieldArray({
        control,
        name: "notes"
    });
    //! watch functions for each fields
    // const clientName = watch('clientsName')
    // const project = watch("projectName");
    // const watchedQueries = watch("queries");
    // const watchedCompletedTasks = watch("completedTasks");
    // const watchedRemainingTasks = watch("remainingTasks");
    // const watchedNoted = watch("notes");
    // const watchedWrittersName = watch('writtersName');

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 text-slate-800">

            {/*! Inputs */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 border-r border-slate-200 overflow-y-auto bg-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">Email Writer</h2>
                    <p className="text-slate-500 mb-8 text-sm">Generate daily updates.</p>

                    <form onSubmit={handleSubmit(emailSubmit)} className="space-y-8">
                        <button className="bg-blue-500 rounded-md px-3 text-white font-bold py-2" type="submit">Save Changes</button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* clients Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ">Client Name</label>
                                <input
                                    type="text"
                                    {...register("clientsName")}

                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                                {errors?.clientsName && <p className="text-red-500">{errors?.clientsName?.message}</p>}
                            </div>

                            {/* //!project Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ">Project Name</label>
                                <input
                                    type="text"
                                    {...register("projectName")}

                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                                {errors?.projectName && <p className="text-red-500">{errors?.projectName?.message}</p>}
                            </div>
                        </div>

                        {/* //! COMPLETED TASKS */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h3 className="font-bold mb-3 text-slate-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Completed Tasks
                            </h3>
                            {completedFields.map((field, index) => (
                                <div key={field.id} className="flex mb-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="Done Task"
                                        {...register(`completedTasks.${index}.completedTask`)}
                                        className="flex-1 p-2 border border-slate-300 rounded-md bg-white"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") appendCompleted(index)
                                        }}
                                    />

                                    {index > 0 && (
                                        <button onClick={() => removeCompleted(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}
                                    {errors?.completedTasks?.[index]?.completedTask && (
                                        <p className="text-red-500">
                                            {errors.completedTasks[index].completedTask.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => appendCompleted({ completedTask: "" })} className="text-sm text-blue-600 font-semibold mt-1">+ Add Task</button>
                        </div>

                        {/* //! REMAINING TASKS */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h3 className="font-bold mb-3 text-slate-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> In-Progress Tasks
                            </h3>
                            {remainingFields.map((field, index) => (
                                <div key={field.id} className="flex mb-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="In-Progress Task"
                                        {...register(`remainingTasks.${index}.remainingTask`)}
                                        className="flex-1 p-2 border border-slate-300 rounded-md bg-white"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") appendRemaining(index)
                                        }}
                                    />
                                    {index > 0 && (
                                        <button onClick={() => removeRemaining(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}
                                    {errors?.remainingTasks?.[index]?.remainingTask && (
                                        <p className="text-red-500">
                                            {errors.remainingTasks[index].remainingTask.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => appendRemaining({ remainingTask: "" })} className="text-sm text-blue-600 font-semibold mt-1">+ Add Task</button>
                        </div>

                        {/* //! QUERIES */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h3 className="font-bold mb-3 text-slate-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Queries
                            </h3>
                            {queriesFields.map((field, index) => (
                                <div key={field.id} className="flex mb-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="Query"
                                        {...register(`queries.${index}.task`)}
                                        className="flex-1 p-2 border border-slate-300 rounded-md bg-white"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") appendQuery(index)
                                        }}
                                    />
                                    {index > 0 && (
                                        <button onClick={() => removeQuery(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}
                                    {errors?.queries?.[index]?.task && (
                                        <p className="text-red-500">
                                            {errors.queries[index].task.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => appendQuery({ task: "" })} className="text-sm text-blue-600 font-semibold mt-1">+ Add Query</button>
                        </div>

                        {/* //! NOTES */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h3 className="font-bold mb-3 text-slate-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-400 rounded-full"></span> Notes
                            </h3>
                            {notesField.map((field, index) => (
                                <div key={field.id} className="flex mb-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder=" Note"
                                        {...register(`notes.${index}.note`)}
                                        className="flex-1 p-2 border border-slate-300 rounded-md bg-white"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") appendNotes(index)
                                        }}
                                    />
                                    {index > 0 && (
                                        <button onClick={() => removeNotes(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}
                                    {errors?.notes?.[index]?.note && (
                                        <p className="text-red-500">
                                            {errors.notes[index].note.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => appendNotes({ note: "" })} className="text-sm text-blue-600 font-semibold mt-1">+ Add Note</button>
                        </div>

                        {/* //! WRITERS NAME */}
                        <div className="pt-4 border-t border-slate-100">
                            <label className="text-xs font-semibold text-slate-500 ">Your Name</label>
                            <input
                                type="text"
                                {...register("writtersName")}
                                placeholder=" Your Name"
                                className="w-full p-2.5 border border-slate-300 rounded-lg mt-1 outline-none focus:border-blue-500"
                            />
                            {errors?.writtersName && <p className="text-red-500">{errors?.writtersName?.message}</p>}
                        </div>
                    </form>
                </div>
            </div>

            {/* //! Preview */}
            <div className="w-full lg:w-3/3 p-6 lg:p-10 bg-slate-100 flex justify-center items-start ">
                <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden border border-slate-200">


                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between ">
                        <span className="text-md font-bold   ">Preview</span>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                        </div>
                    </div>

                    {/* //! start of Email */}
                    <div className="p-8 md:p-12 text-[17px] leading-relaxed  overflow-x-auto text-black">

                        {/* //! title | project name | subject */}

                        {emailDetails?.projectName && <div className="border-b mb-5 border-slate-200">
                            <p className="pb-2">
                                Updates for {emailDetails.projectName} as on {todayDate}th {month}, {year}
                            </p>
                        </div>}

                        {/* //! clients Name */}

                        {emailDetails?.clientsName && (
                            <p className="mb-6 ">
                                Hi <span className=" text-black">{emailDetails.clientsName}</span>,
                            </p>
                        )}
                        {/* //! project name */}
                        {emailDetails?.projectName && (
                            <p className="mb-6 text-black ">
                                Following are the current updates for{" "}
                                <span className="font-semibold underline decoration-black underline-offset-4">{emailDetails.projectName}</span> as on {todayDate}th {month}, {year}:
                            </p>
                        )}
                        {/* //! completed Task */}
                        {emailDetails?.completedTasks?.some(
                            (item) => item.completedTask?.trim() !== ""
                        ) && (
                                <div className="mb-6">
                                    <p className="font-bold text-black underline">
                                        List of Completed Tasks:
                                    </p>

                                    <ul className="list-decimal ml-10">
                                        {emailDetails.completedTasks.map(
                                            (item, index) =>
                                                item.completedTask?.trim() !== "" && (
                                                    <li key={index} className="pl-1">
                                                        {item.completedTask}
                                                        <span className="text-black font-bold ml-1 text-[13px]">
                                                            [DONE]
                                                        </span>
                                                    </li>
                                                )
                                        )}
                                    </ul>
                                </div>
                            )}
                        {/* //! in - progress Task */}
                        {emailDetails?.remainingTasks?.some((item) => item.remainingTask.trim() !== "") && (
                            <div className="mb-6 ">
                                <p className="font-bold text-black underline  ">List of In-Progress Tasks:</p>
                                <ul className="list-decimal ml-10 ">
                                    {emailDetails?.remainingTasks.map(
                                        (item, index) =>
                                            item.remainingTask && (
                                                <li key={index} className="pl-1">{item.remainingTask}</li>
                                            )
                                    )}
                                </ul>
                            </div>
                        )}
                        {/* //! Queries */}
                        {emailDetails?.queries?.some(item => item.task.trim() !== "") && (
                            <div className="mb-6 ">
                                {emailDetails?.queries && (<p className="font-bold text-black underline  ">Queries:</p>)}
                                <ul className="list-decimal ml-10 ">
                                    {emailDetails?.queries.map(
                                        (item, index) =>
                                            item.task && (
                                                item.task && <li key={index} className="pl-1">{item.task}</li>
                                            )
                                    )}
                                </ul>
                            </div>
                        )}
                        {/* //! Notes */}
                        {emailDetails?.notes?.some(item => item.note.trim() !== "") && (
                            <div className="mb-3 ">
                                {emailDetails?.notes && (<p className="font-bold text-black underline  ">Notes:</p>)}
                                <ul className="list-decimal ml-10 ">
                                    {emailDetails?.notes.map(
                                        (item, index) =>
                                            item.note && <li key={index} className="pl-1">{item.note}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                        {/* //! closer */}
                        {emailDetails?.completedTasks?.some(item => item.completedTask.trim() !== "") && (
                            <p className="">Please check with the latest updates and let us know your thoughts for the same.</p>
                        )
                        }
                        {/* //! writters Name */}
                        {emailDetails?.writtersName?.trim() !== "" && (
                            <div className="pt-5   border-slate-100">
                                {emailDetails?.writtersName && (<p className=" text-black ">Thanks,</p>)}
                                <p className=" text-black ">{emailDetails?.writtersName}</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualWriting;