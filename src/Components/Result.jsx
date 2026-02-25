import React from 'react'

const Result = ({ data, project, hasCompletedTasks, hasDoneQueries, hasNotes, hasRemainingTasks, watchedCompletedTasks, watchedNoted, watchedQueries, watchedRemainingTasks, watchedWrittersName }) => {
    return (
        <>
            <div className="w-1/2 p-10 bg-gray-50">
                <div className="bg-white p-8 shadow-sm border border-gray-200 min-h-full rounded-md">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Preview</h2>

                    <div className="space-y-4">
                        {data && (
                            <p className="text-lg">
                                Hi <span className="font-bold">{data}</span>,
                            </p>
                        )}

                        {project && (
                            <p>
                                Here is an update on the{" "}
                                <span className="font-medium underline">{project}</span> project:
                            </p>
                        )}

                        {hasCompletedTasks && (
                            <div>
                                <p className="font-bold text-gray-700">Completed Tasks:</p>
                                <ul className="list-disc ml-6">
                                    {watchedCompletedTasks.map(
                                        (item, index) =>
                                            item.completedTask && (
                                                <li key={index}>{item.completedTask}</li>
                                            )
                                    )}
                                </ul>
                            </div>
                        )}

                        {hasRemainingTasks && (
                            <div>
                                <p className="font-bold text-gray-700">Remaining Tasks:</p>
                                <ul className="list-disc ml-6">
                                    {watchedRemainingTasks.map(
                                        (item, index) =>
                                            item.remainingTask && (
                                                <li key={index}>{item.remainingTask}</li>
                                            )
                                    )}
                                </ul>
                            </div>
                        )}

                        {hasDoneQueries && (
                            <div>
                                <p className="font-bold text-gray-700">Queries:</p>
                                <ul className="list-disc ml-6">
                                    {watchedQueries.map(
                                        (item, index) =>
                                            item.task && <li key={index}>{item.task}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                        {hasNotes && (
                            <div>
                                <p className="font-bold text-gray-700">Notes:</p>
                                <ul className="list-disc ml-6">
                                    {watchedNoted.map(
                                        (item, index) =>
                                            item.note && <li key={index}>{item.note}</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {watchedWrittersName && (
                            <div className="pt-6">
                                <p>Best regards,</p>
                                <p className="font-semibold text-blue-600">{watchedWrittersName}</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Result