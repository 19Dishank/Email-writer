import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const Temp = () => {
    const { register, watch, control } = useForm({
        defaultValues: {
            clientsName: "",
            projectName: "",
            doneTasks: [{ task: "" }],
            completedTasks: [{ completedTask: "" }],
            remainingTasks: [{ remainingTask: "" }],
        },
    });

    const data = watch("clientsName");
    const watchedTasks = watch("doneTasks");
    const watchedCompletedTasks = watch("completedTasks");
    const watchedRemainingTasks = watch("remainingTasks");
    const project = watch("projectName");

    // First Field Array
    const {
        fields: doneFields,
        append: appendDone,
        remove: removeDone,
    } = useFieldArray({
        control,
        name: "doneTasks",
    });

    // Second Field Array
    const {
        fields: completedFields,
        append: appendCompleted,
        remove: removeCompleted,
    } = useFieldArray({
        control,
        name: "completedTasks",
    });

    // Third Field Array
    const {
        fields: remainingFields,
        append: appendRemaining,
        remove: removeRemaining,
    } = useFieldArray({
        control,
        name: "remainingTasks",
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Email Writer</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* FORM SECTION */}
                    <div className="space-y-8">
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <label className="block text-sm font-medium text-gray-700">Client Details</label>
                                <input
                                    type="text"
                                    {...register("clientsName")}
                                    placeholder="Enter Name"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />

                                <input
                                    type="text"
                                    {...register("projectName")}
                                    placeholder="Project Name"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>

                            {/* DONE TASKS */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-b pb-1">Done Tasks</h3>
                                {doneFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            type="text"
                                            {...register(`doneTasks.${index}.task`)}
                                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeDone(index)}
                                                className="px-3 text-red-500 hover:bg-red-50 rounded-md transition"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => appendDone({ task: "" })}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    + Add Task
                                </button>
                            </div>

                            {/* COMPLETED TASKS */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-b pb-1">Completed Tasks</h3>
                                {completedFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            type="text"
                                            {...register(`completedTasks.${index}.completedTask`)}
                                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeCompleted(index)}
                                                className="px-3 text-red-500 hover:bg-red-50 rounded-md transition"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => appendCompleted({ completedTask: "" })}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    + Add Completed Task
                                </button>
                            </div>

                            {/* REMAINING TASKS */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-b pb-1">Remaining Tasks</h3>
                                {remainingFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            type="text"
                                            {...register(`remainingTasks.${index}.remainingTask`)}
                                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeRemaining(index)}
                                                className="px-3 text-red-500 hover:bg-red-50 rounded-md transition"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => appendRemaining({ remainingTask: "" })}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    + Add Remaining Task
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* PREVIEW SECTION */}
                    <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm h-fit sticky top-8">
                        <div className="mb-6">
                            <h2 className="text-xs font-bold text-gray-400 uppercase mb-4">Email Preview</h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                {data && <p className="font-medium">Hi {data},</p>}
                                {project && <p>Regarding the project: <span className="font-semibold">{project}</span></p>}

                                <div className="space-y-6">
                                    {watchedTasks.some(t => t.task) && (
                                        <section>
                                            <p className="font-medium text-gray-900 mb-1 underline">Done Tasks:</p>
                                            <ul className="list-disc ml-5 space-y-1">
                                                {watchedTasks.map((item, index) => item.task && <li key={index}>{item.task}</li>)}
                                            </ul>
                                        </section>
                                    )}

                                    {watchedCompletedTasks.some(t => t.completedTask) && (
                                        <section>
                                            <p className="font-medium text-gray-900 mb-1 underline">Completed Tasks:</p>
                                            <ul className="list-disc ml-5 space-y-1">
                                                {watchedCompletedTasks.map((item, index) => item.completedTask && <li key={index}>{item.completedTask}</li>)}
                                            </ul>
                                        </section>
                                    )}

                                    {watchedRemainingTasks.some(t => t.remainingTask) && (
                                        <section>
                                            <p className="font-medium text-gray-900 mb-1 underline">Remaining Tasks:</p>
                                            <ul className="list-disc ml-5 space-y-1">
                                                {watchedRemainingTasks.map((item, index) => item.remainingTask && <li key={index}>{item.remainingTask}</li>)}
                                            </ul>
                                        </section>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <button type="button"

                // disabled={isLastFieldEmpty(watchedComppletedTask, 'completedTask')}
                onClick={() => {
                    if (!isLastFieldEmpty(watchedComppletedTask, 'completedTask')) {
                        appendCompleted({ completedTask: "" });
                    }
                }}
                // onClick={() => appendCompleted({ 'completedTask': "" })}
                className="text-sm text-blue-600 font-semibold mt-1 disabled:text-gray-500">
                + {`Add Task`}
                {/* {isLastFieldEmpty(watchedComppletedTask, 'completedTask') ? "" : " +Add Task"} */}
            </button>
        </div>
    );
};

export default Temp;