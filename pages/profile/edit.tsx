import { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <div className="space-y-4 py-10 px-4">
      <div className="flex items-center space-x-3">
        <div className="h-14 w-14 rounded-full bg-slate-500" />
        <label
          htmlFor="picture"
          className="cursor-pointer rounded-md border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Change
          <input id="picture" type="file" className="hidden" accept="image/*" />
        </label>
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          className="py2 w-full appearance-none rounded-md px-3 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          type="email"
          placeholder="Write your Email"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone number
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            id="phone"
            className="py2 w-full appearance-none rounded-md rounded-l-none  border px-3 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            type="number"
            required
          />
        </div>
      </div>
      <button className="focus: mt-5 w-full rounded-md  border-transparent  bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm ring-offset-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
        Update Profile
      </button>
    </div>
  );
};
export default EditProfile;
