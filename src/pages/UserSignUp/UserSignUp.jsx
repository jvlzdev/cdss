import { useEffect, useState } from "react";
import { useSignupMutation } from "../../services/appApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImg from '../../assets/DESIGNATION.png'
import logoImg from '../../assets/logo.png'

function UserSignUp() {
  const user = useSelector((state) => state.user);
  // const [email, setEmail] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const navigate = useNavigate();
  console.log({ error, isLoading, isError });
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  // useEffect(() => {
  //   if (isError) {
  //     alert(error?.data)
  //   }
  // }, [isError, error])

  function handleSignUp(e) {
    e.preventDefault();
    const name = `${firstName} ${lastName}`;
    console.log("signup", { name, licenseNo, role, password });
    signup({ name, licenseNo, role, password });
  }

  function handleOnClickSignIn(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={bgImg}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600 flex justify-center" href="#">
              <span className="sr-only">Home</span>
              <img src={logoImg} width={250} height="auto" />
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Apex Medical Center
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Please sign in to your account.
            </p>

            <form onSubmit={handleSignUp} className="mt-8 grid gap-6">
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
                />
              </div>

              {/* <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="LicenseNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-500 text-lg text-gray-700 shadow-sm p-2"
                />
              </div> */}

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="LicenseNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  License No.
                </label>

                <input
                  type="text"
                  maxLength={6}
                  onChange={(e) => setLicenseNo(e.target.value)}
                  id="LicenseNo"
                  name="license_no"
                  className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Role"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Role{" "}
                </label>

                <select
                  name="Role"
                  id="Role"
                  className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Please select</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
                />
              </div>
              {isError && (
                <div className="col-span-6 sm:col-span-6 text-red-500 text-sm">
                  {error?.data?.error}
                </div>
              )}
              {/* <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div> */}

              {/* <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline">
                      {" "}
                      terms and conditions{" "}
                    </a>
                    and
                    <a href="#" className="text-gray-700 underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>
            */}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ background: '#345673'}}
                  className="inline-block shrink-0 rounded-md border px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-stone-200 focus:outline-none focus:ring active:text-stone-200"
                >
                  Create an Account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a
                    href=""
                    className="text-gray-700 underline ml-1"
                    onClick={handleOnClickSignIn}
                  >
                    Sign In
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default UserSignUp;
