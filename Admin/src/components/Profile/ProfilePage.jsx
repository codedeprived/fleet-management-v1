import React from "react";

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen p-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* Profile Card */}
          <div className="w-full md:w-1/3 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img
                      className="rounded-full"
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Maxwell Admin"
                    />
                  </div>
                  <h5 className="text-xl font-semibold">ADMIN</h5>
                  <h6 className="text-gray-600 dark:text-gray-400">Admin@gamil.com</h6>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-semibold">About</h5>
                  <p className="text-gray-500 dark:text-gray-400">
                    I'm Admin. i love to mange the fleet mangement .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details Form */}
          <div className="w-full md:w-2/3 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
              <div className="p-6">
                <h6 className="mb-4 text-blue-600 dark:text-blue-400">Personal Details</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter full name"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="eMail" className="block mb-1">Email</label>
                    <input
                      type="email"
                      id="eMail"
                      placeholder="Enter email ID"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-1">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Enter phone number"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block mb-1">Id </label>
                    <input
                      type="text"
                      id="Id"
                      placeholder="Id"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                </div>

                <h6 className="mt-6 mb-4 text-blue-600 dark:text-blue-400">Address</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="Street" className="block mb-1">Street</label>
                    <input
                      type="text"
                      id="Street"
                      placeholder="Enter Street"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="ciTy" className="block mb-1">City</label>
                    <input
                      type="text"
                      id="ciTy"
                      placeholder="Enter City"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="sTate" className="block mb-1">State</label>
                    <input
                      type="text"
                      id="sTate"
                      placeholder="Enter State"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="zIp" className="block mb-1">Zip Code</label>
                    <input
                      type="text"
                      id="zIp"
                      placeholder="Zip Code"
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded p-2 w-full"
                    />
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <button className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded mr-2">
                    Cancel
                  </button>
                  <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
