import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api
// This variable handles request header informations
const APIHeader = { "content-type": "application/json" };
// Base URL
const createRequest = (url) => ({ url, headers: APIHeader });

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => createRequest('users/employees'),
            providesTags: ['Employees']
        }),
        updateEmployeeById: builder.mutation({
            query: (user) => ({
                url: `users/employee/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['Employees']
        }),
        deleteEmployeeById: builder.mutation({
            query: ({ id }) => ({
                url: `/users/employee/${id}`,
                body: {
                    id,
                },
                method: "DELETE",
            }),
            invalidatesTags: ['Employees']
        }),
        createEmployee: builder.mutation({
            query: (user) => ({
                url: "/users/employee",
                body: user,
                method: "POST",
            }),
            invalidatesTags: ['Employees']
        }),
        getPatients: builder.query({
            query: () => createRequest('/patients'),
            providesTags: ['Patients']
        }),
        createPatient: builder.mutation({
            query: (body) => ({
                url: "/patients",
                body,
                method: "POST",
            }),
            invalidatesTags: ['Patients']
        }),
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
        // creating product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),

        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),

        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),
        // remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),

        // increase cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),

        // decrease cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
        // create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useUpdateEmployeeByIdMutation,
    useDeleteEmployeeByIdMutation,
    useCreateEmployeeMutation,
    useGetPatientsQuery,
    useCreatePatientMutation,
    useSignupMutation,
    useLoginMutation,
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = appApi;

export default appApi;
