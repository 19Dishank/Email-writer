import * as yup from "yup";

export const validationSchema = yup.object({
    clientsName: yup.string().required("Client name is required"),
    projectName: yup.string().required("Project name is required"),

    completedTasks: yup
        .array()
        .of(
            yup.object({
                completedTask: yup
                    .string()
                    .required("Completed task is required"),
            })
        )
        .min(1),

    remainingTasks: yup.array().of(
        yup.object({
            remainingTask: yup
                .string()
                .trim()
                .nullable()
                .notRequired(),
        })
    ),

    queries: yup.array().of(
        yup.object({
            task: yup
                .string()
                .trim()
                .nullable()
                .notRequired(),
        })
    ),

    notes: yup.array().of(
        yup.object({
            note: yup
                .string()
                .trim()
                .nullable()
                .notRequired(),
        })
    ),

    writtersName: yup.string().required("Writer name is required"),
});