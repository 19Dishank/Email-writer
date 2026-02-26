import { useForm, useFieldArray } from "react-hook-form";

const Form = () => {
    const { register,
        watch,
        control,
        setError,
        clearErrors,
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

        });

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

    const formattedDate = `${todayDate}${suffix} ${month}, ${year}`;

    // console.log(formattedDate);


    const data = watch("clientsName");
    const project = watch("projectName");
    const watchedQueries = watch("queries");
    const watchedCompletedTasks = watch("completedTasks");
    const watchedRemainingTasks = watch("remainingTasks");
    const watchedNoted = watch("notes");
    const watchedWrittersName = watch('writtersName');
    const isLastFieldEmpty = (field, subField) => {
        return field.length > 0 && !field[field.length - 1][subField];
    };
    // Queries Field Array
    const {
        fields: queriesFields,
        append: appendQuery,
        remove: removeQuery,
    } = useFieldArray({
        control,
        name: "queries",
    });

    // Completed Field Array
    const {
        fields: completedFields,
        append: appendCompleted,
        remove: removeCompleted,
    } = useFieldArray({
        control,
        name: "completedTasks",
    });

    // Remaining Field Array
    const {
        fields: remainingFields,
        append: appendRemaining,
        remove: removeRemaining,
    } = useFieldArray({
        control,
        name: "remainingTasks",
    });

    // Notes
    const {
        fields: notesField,
        append: appendNotes,
        remove: removeNotes,
    } = useFieldArray({
        control,
        name: "notes"
    });

    const hasDoneQueries = watchedQueries?.filter(item => item.task !== "").length > 0;
    const hasCompletedTasks = watchedCompletedTasks?.filter(item => item.completedTask !== "").length > 0;
    const hasRemainingTasks = watchedRemainingTasks?.filter(item => item.remainingTask !== "").length > 0;
    const hasNotes = watchedNoted?.filter(item => item.note !== "").length > 0;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 text-slate-800">

            {/* Inputs */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 border-r border-slate-200 overflow-y-auto bg-white">
                <div className="max-w-2xl mx-auto">

                    {/* <p className="text-center text-slate-600 mb-8 text-xl">
                        I'm here to write your <span className="font-bold text-slate-900">daily update.</span>
                    </p> */}

                    <h2 className="text-2xl font-bold mb-2 text-slate-900 capitalize">write daily updates</h2>
                    <p className="text-slate-500 mb-8 text-sm">I'm here to write your daily updates.</p>


                    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ">Client Name</label>
                                <input
                                    type="text"
                                    {...register("clientsName")}

                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 ">Project Name</label>
                                <input
                                    type="text"
                                    {...register("projectName")}

                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* COMPLETED TASKS */}
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
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                validateAndAppend("completedTask", "completedTask", watchedCompletedTasks, appendCompleted);
                                            }
                                        }}
                                    />
                                    {index > 0 && (
                                        <button onClick={() => removeCompleted(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}

                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => validateAndAppend(
                                    "completedTask",
                                    "completedTask",
                                    watchedCompletedTasks,
                                    appendCompleted
                                )}
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

                        {/* REMAINING TASKS */}
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
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                validateAndAppend("remainingTask", "remainingTask", watchedRemainingTasks, appendRemaining);
                                            }
                                        }}
                                    />
                                    {index > 0 && (
                                        <button onClick={() => removeRemaining(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => validateAndAppend(
                                    "remainingTask",
                                    "remainingTask",
                                    watchedRemainingTasks,
                                    appendRemaining
                                )}
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

                        {/* QUERIES */}
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
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                validateAndAppend("task", "task", watchedQueries, appendQuery);
                                            }
                                        }}
                                    />
                                    {index > 0 && (
                                        <button onClick={() => removeQuery(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => validateAndAppend(
                                    "task",
                                    "task",
                                    watchedQueries,
                                    appendQuery
                                )}
                                className="text-sm text-blue-600 font-semibold mt-2 flex items-center gap-1  active:scale-95 transition-transform"
                            >
                                <span className="text-lg">+</span> Add Query
                            </button>

                            {errors?.task && (
                                <p className="text-red-500 text-sm mt-1 italic">
                                    {errors?.task.message}
                                </p>
                            )}
                        </div>

                        {/* NOTES */}
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
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                validateAndAppend("note", "note", watchedNoted, appendNotes);
                                            }
                                        }}
                                    />
                                    {index > 0 && (
                                        <button onClick={() => removeNotes(index)} className="text-red-500 px-2 hover:bg-red-50 rounded">✕</button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => validateAndAppend(
                                    "note",
                                    "note",
                                    watchedNoted,
                                    appendNotes
                                )}
                                className="text-sm text-blue-600 font-semibold mt-1 flex items-center gap-1 "
                            >
                                <span className="text-lg">+</span> Add Note
                            </button>

                            {errors?.note && (
                                <p className="text-red-500 text-sm mt-1 italic">
                                    {errors?.note.message}
                                </p>
                            )}
                        </div>

                        {/* WRITERS NAME */}
                        <div className="pt-4 border-t border-slate-100">
                            <label className="text-xs font-semibold text-slate-500 ">Your Name</label>
                            <input
                                type="text"
                                {...register("writtersName")}
                                placeholder=" Your Name"
                                className="w-full p-2.5 border border-slate-300 rounded-lg mt-1 outline-none focus:border-blue-500"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Preview */}
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

                    {/* start of Email */}
                    <div className="p-8 md:p-12 text-[17px] leading-relaxed  overflow-x-auto text-black">
                        {project && <div className="border-b mb-5 border-slate-200">
                            <p className="pb-2">
                                Updates for {project} as on {formattedDate}
                            </p>
                        </div>}
                        {data && (
                            <p className="mb-6 ">
                                Hi <span className=" text-black">{data}</span>,
                            </p>
                        )}

                        {project && (
                            <p className="mb-6 text-black ">
                                Following are the current updates for{" "}
                                <span className="font-semibold underline decoration-black underline-offset-4">{project}</span> as on {formattedDate} :
                            </p>
                        )}

                        {hasCompletedTasks && (
                            <div className="mb-6 ">
                                <p className="font-bold text-black underline ">List of Completed Tasks:</p>
                                <ul className="list-decimal ml-10 ">
                                    {watchedCompletedTasks.map(
                                        (item, index) =>
                                            item.completedTask && (
                                                <li key={index} className="pl-1">
                                                    {item.completedTask}{" "}
                                                    <span className="text-black font-bold ml-1 text-[13px]">[DONE]</span>
                                                </li>
                                            )
                                    )}
                                </ul>
                            </div>
                        )}

                        {hasRemainingTasks && (
                            <div className="mb-6 ">
                                <p className="font-bold text-black underline  ">List of In-Progress Tasks:</p>
                                <ul className="list-decimal ml-10 ">
                                    {watchedRemainingTasks.map(
                                        (item, index) =>
                                            item.remainingTask && (
                                                <li key={index} className="pl-1">{item.remainingTask}</li>
                                            )
                                    )}
                                </ul>
                            </div>
                        )}

                        {hasDoneQueries && (
                            <div className="mb-6 ">
                                <p className="font-bold text-black underline  ">Queries:</p>
                                <ul className="list-decimal ml-10 ">
                                    {watchedQueries.map(
                                        (item, index) =>
                                            item.task && <li key={index} className="pl-1">{item.task}</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {hasNotes && (
                            <div className="mb-3 ">
                                <p className="font-bold text-black underline  ">Notes:</p>
                                <ul className="list-decimal ml-10 ">
                                    {watchedNoted.map(
                                        (item, index) =>
                                            item.note && <li key={index} className="pl-1">{item.note}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                        {hasCompletedTasks && (
                            <p className="">Please check with the latest updates and let us know your thoughts for the same.</p>
                        )}
                        {watchedWrittersName && (
                            <div className="pt-5   border-slate-100">
                                <p className=" text-black ">Thanks,</p>
                                <p className=" text-black ">{watchedWrittersName}</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;