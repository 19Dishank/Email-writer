import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { validationSchema } from "../utils/ValidationSchemas";
import { useState } from "react";



const ManualWriting = () => {
    const [emailDetails, setEmailDetails] = useState(null)
    const [isExpandedCompeted, setIsExpandedCompleted] = useState(true);
    const [isExpandedRemaining, setIsExpandedRemaining] = useState(true);
    const [isExpandedQueries, setIsExpandedQueries] = useState(false);
    const [isExpandedNotes, setIsExpandedNotes] = useState(false);
    const { register,
        watch,
        control,
        handleSubmit, setError, clearErrors,
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
    //! watch methods
    const watchedComppletedTask = watch("completedTasks")
    const watchedQueries = watch("queries")
    const watchedNotes = watch("notes")
    const watchedRemainingTasks = watch("remainingTasks")


    const emailSubmit = (values) => {
        // console.log(values)
        setEmailDetails(values);
    }

    // validation function for all
    const validateAndAppend = (fieldName, subFieldName, watchedValue, appendFn, errorMessage) => {
        if (isLastFieldEmpty(watchedValue, subFieldName)) {
            setError(fieldName, {
                type: "manual",
                message: errorMessage || "Please fill the last field before adding a new one.",
            });
        } else {
            clearErrors(fieldName);
            appendFn({ [subFieldName]: "" });
        }
    };


    // todo: date and time
    // suffix for dates
    const today = new Date();
    const todayDate = today.getDate();

    const getSuffix = (day) => {
        if (day >= 11 && day <= 13) return "th";

        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const suffix = getSuffix(todayDate);

    const formattedDate = `${month} ${todayDate}${suffix}, ${year}`;

    console.log(formattedDate);
    console.log(suffix)
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


    // const isLastFieldEmpty = watchedItems.length > 0 && !watchedItems[watchedItems.length - 1].name;
    const isLastFieldEmpty = (field, subField) => {
        return field.length > 0 && !field[field.length - 1][subField];
    };
    // console.log(isLastFieldEmpty)
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


    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 text-slate-800">
            {/*! form */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 border-r border-slate-200 overflow-y-auto bg-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900 capitalize">write daily updates</h2>
                    <p className="text-slate-500 mb-8 text-sm">I'm here to write your daily updates.</p>

                    <form onSubmit={handleSubmit(emailSubmit)} className="space-y-8">
                        <button className="bg-blue-500 rounded-md px-3 text-white font-bold py-2" type="submit">Save Changes</button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* //! clients Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ">Client Name</label>
                                <input
                                    type="text"
                                    {...register("clientsName")}

                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                                {errors?.clientsName && <p className="text-red-500 text-xs">{errors?.clientsName?.message}</p>}
                            </div>

                            {/* //!project Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ">Project Name</label>
                                <input
                                    type="text"
                                    {...register("projectName")}

                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                                {errors?.projectName && <p className="text-red-500 text-xs">{errors?.projectName?.message}</p>}
                            </div>
                        </div>

                        {/* //! COMPLETED TASKS */}

                        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">

                            <button
                                type="button"
                                onClick={() => setIsExpandedCompleted(!isExpandedCompeted)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
                            >
                                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Completed Tasks
                                    <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                                        {completedFields.length}
                                    </span>
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-slate-500 transition-transform ${isExpandedCompeted ? "rotate-180" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>


                            {isExpandedCompeted && (
                                <div className="p-4 pt-0 border-t border-slate-100">
                                    <div className="mt-3">
                                        {completedFields.map((field, index) => (
                                            <div key={field.id} className="mb-3">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Done Task"
                                                        {...register(`completedTasks.${index}.completedTask`)}
                                                        className={`flex-1 p-2 border rounded-md bg-white ${errors?.completedTasks?.[index]?.completedTask
                                                            ? "border-red-400"
                                                            : "border-slate-300"
                                                            }`}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault()
                                                                validateAndAppend("completedTask", "completedTask", watchedComppletedTask, appendCompleted);

                                                            }
                                                        }}
                                                    />

                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCompleted(index)}
                                                            className="text-red-500 px-2 hover:bg-red-50 rounded"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>

                                                {errors?.completedTasks?.[index]?.completedTask && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.completedTasks[index].completedTask.message}
                                                    </p>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                validateAndAppend("completedTask", "completedTask", watchedComppletedTask, appendCompleted);
                                            }}
                                            className="text-sm text-blue-600 font-semibold mt-1 flex items-center gap-1 "
                                        >
                                            <span className="text-lg">+</span> Add Task
                                        </button>

                                        {errors?.completedTask && (
                                            <p className="text-red-500 text-sm mt-1 italic">
                                                {errors?.completedTask.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* //! REMAINING TASKS */}

                        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">

                            <button
                                type="button"
                                onClick={() => setIsExpandedRemaining(!isExpandedRemaining)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
                            >
                                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                    In-Progress Tasks
                                    <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                                        {remainingFields.length}
                                    </span>
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-slate-500 transition-transform ${isExpandedRemaining ? "rotate-180" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>


                            {isExpandedRemaining && (
                                <div className="p-4 pt-0 border-t border-slate-100">
                                    <div className="mt-3">
                                        {remainingFields.map((field, index) => (
                                            <div key={field.id} className="mb-3">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="In-Progress Task"
                                                        {...register(`remainingTasks.${index}.remainingTask`)}
                                                        className={`flex-1 p-2 border rounded-md bg-white transition-all ${errors?.remainingTasks?.[index]?.remainingTask
                                                            ? "border-red-400 ring-1 ring-red-50"
                                                            : "border-slate-300 focus:border-blue-400 outline-none"
                                                            }`}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                validateAndAppend("remainingTask", "remainingTask", watchedRemainingTasks, appendRemaining);
                                                            }
                                                        }}
                                                    />

                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeRemaining(index)}
                                                            className="text-red-500 px-2 hover:bg-red-50 rounded transition-colors"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>


                                                {errors?.remainingTasks?.[index]?.remainingTask && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.remainingTasks[index].remainingTask.message}
                                                    </p>
                                                )}
                                            </div>
                                        ))}


                                        <button
                                            type="button"
                                            onClick={() => {
                                                validateAndAppend("remainingTask", "remainingTask", watchedRemainingTasks, appendRemaining);
                                            }}
                                            className="text-sm text-blue-600 font-semibold mt-1 flex items-center gap-1 "
                                        >
                                            <span className="text-lg">+</span> Add Task
                                        </button>


                                        {errors?.remainingTask && (
                                            <p className="text-red-500 text-sm mt-1 italic">
                                                {errors?.remainingTask.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* //! QUERIES */}


                        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">

                            <button
                                type="button"
                                onClick={() => setIsExpandedQueries(!isExpandedQueries)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
                            >
                                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full shadow-sm shadow-blue-200"></span>
                                    Queries
                                    <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                                        {queriesFields.length}
                                    </span>
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isExpandedQueries ? "rotate-180" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>


                            {isExpandedQueries && (
                                <div className="p-4 pt-0 border-t border-slate-100">
                                    <div className="mt-3">
                                        {queriesFields.map((field, index) => (
                                            <div key={field.id} className="mb-3">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your query..."
                                                        {...register(`queries.${index}.task`)}
                                                        className={`flex-1 p-2 border rounded-md bg-white transition-all focus:ring-2 focus:ring-blue-100 outline-none ${errors?.queries?.[index]?.task
                                                            ? "border-red-400"
                                                            : "border-slate-300 focus:border-blue-400"
                                                            }`}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                validateAndAppend("task", "task", watchedQueries, appendQuery);
                                                            }
                                                        }}
                                                    />

                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeQuery(index)}
                                                            className="text-red-500 px-2 hover:bg-red-50 rounded transition-colors"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>

                                                {errors?.queries?.[index]?.task && (
                                                    <p className="text-red-500 text-xs mt-1 ml-1">
                                                        {errors.queries[index].task.message}
                                                    </p>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                validateAndAppend("task", "task", watchedQueries, appendQuery);
                                            }}
                                            className="text-sm text-blue-600 font-semibold mt-2 flex items-center gap-1  active:scale-95 transition-transform"
                                        >
                                            <span className="text-lg">+</span> Add Query
                                        </button>

                                        {errors?.task && (
                                            <p className="text-red-500 text-sm mt-2 italic">
                                                {errors?.task.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* //! NOTES */}


                        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setIsExpandedNotes(!isExpandedNotes)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
                            >
                                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                                    Notes
                                    <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                                        {notesField.length}
                                    </span>
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-slate-500 transition-transform ${isExpandedNotes ? "rotate-180" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isExpandedNotes && (
                                <div className="p-4 pt-0 border-t border-slate-100">
                                    <div className="mt-3">
                                        {notesField.map((field, index) => (
                                            <div key={field.id} className="mb-3">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Note"
                                                        {...register(`notes.${index}.note`)}
                                                        className={`flex-1 p-2 border rounded-md bg-white ${errors?.notes?.[index]?.note
                                                            ? "border-red-400"
                                                            : "border-slate-300"
                                                            }`}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                validateAndAppend("note", "note", watchedNotes, appendNotes);
                                                            }
                                                        }}
                                                    />

                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeNotes(index)}
                                                            className="text-red-500 px-2 hover:bg-red-50 rounded"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>

                                                {errors?.notes?.[index]?.note && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.notes[index].note.message}
                                                    </p>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                validateAndAppend("note", "note", watchedNotes, appendNotes);
                                            }}
                                            className="text-sm text-blue-600 font-semibold mt-1 flex items-center gap-1 "
                                        >
                                            <span className="text-lg">+</span> Add Note
                                        </button>

                                        {errors?.note && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.note.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
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
                            {errors?.writtersName && <p className="text-red-500 text-xs">{errors?.writtersName?.message}</p>}
                        </div>
                    </form>
                </div>
            </div >

            {/* //! Preview */}
            < div className="w-full lg:w-3/3 p-6 lg:p-10 bg-slate-100 flex justify-center items-start " >
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
                                Updates for {emailDetails.projectName} as on {todayDate}{suffix} {month}, {year}
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
                                <span className="font-semibold underline decoration-black underline-offset-4">{emailDetails.projectName}</span> as on {todayDate}{suffix} {month}, {year}:
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
                                                        <span className="text-black font-bold tracking-wide uppercase ml-1 text-[13px] ">
                                                            [Done]
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
            </ div>
        </div >
    );
};

export default ManualWriting;