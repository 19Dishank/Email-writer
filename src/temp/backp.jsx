// ! completed Task
{/* <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
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
                                        <button
                                            onClick={() => removeCompleted(index)} className="text-red-500 px-2 hover:bg-red-50 rounded"

                                        >
                                            ✕
                                        </button>
                                    )}
                                    {errors?.completedTasks?.[index]?.completedTask && (
                                        <p className="text-red-500 text-xs">
                                            {errors.completedTasks[index].completedTask.message}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => {
                                    if (isLastFieldEmpty(watchedComppletedTask, "completedTask")) {
                                        setError("completedTask", {
                                            type: "manual",
                                            message: "Please fill the last task before adding a new one."
                                        });
                                    } else {
                                        clearErrors("completedTask");
                                        appendCompleted({ completedTask: "" });
                                    }
                                }}
                                className="text-sm text-blue-600 font-semibold mt-1"
                            >
                                + Add Task
                            </button>
                            {errors?.completedTask && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors?.completedTask.message}
                                </p>
                            )}
                        </div> */}


//! In -progrress 
{/* //! REMAINING TASKS */ }
{/* <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
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
                                        <p className="text-red-500 text-xs">
                                            {errors.remainingTasks[index].remainingTask.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    if (isLastFieldEmpty(watchedRemainingTasks, "remainingTask")) {
                                        setError("remainingTask", {
                                            type: "manual",
                                            message: "Please fill the last task before adding a new one."
                                        });
                                    } else {
                                        clearErrors("remainingTask");
                                        appendRemaining({ remainingTask: "" });
                                    }
                                }}
                                className="text-sm text-blue-600 font-semibold mt-1"
                            >
                                + Add Task
                            </button>
                            {errors?.remainingTask && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors?.remainingTask.message}
                                </p>
                            )}
                        </div> */}

{/* //! QUERIES */ }
{/* <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
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
                                        <p className="text-red-500 text-xs">
                                            {errors.queries[index].task.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    if (isLastFieldEmpty(watchedQueries, "task")) {
                                        setError("task", {
                                            type: "manual",
                                            message: "Please fill the last task before adding a new one."
                                        });
                                    } else {
                                        clearErrors("task");
                                        appendQuery({ task: "" });
                                    }
                                }}
                                className="text-sm text-blue-600 font-semibold mt-1"
                            >
                                + Add Task
                            </button>
                            {errors?.task && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors?.task.message}
                                </p>
                            )}
                        </div> */}


{/* //! NOTES */ }
{/* <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
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
                                        <p className="text-red-500 text-xs">
                                            {errors.notes[index].note.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    if (isLastFieldEmpty(watchedNotes, "note")) {
                                        setError("note", {
                                            type: "manual",
                                            message: "Please fill the last task before adding a new one."
                                        });
                                    } else {
                                        clearErrors("note");
                                        appendNotes({ note: "" });
                                    }
                                }}
                                className="text-sm text-blue-600 font-semibold mt-1"
                            >
                                + Add Task
                            </button>
                            {errors?.note && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors?.note.message}
                                </p>
                            )}
                        </div> */}