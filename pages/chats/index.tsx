import { NextPage } from "next";

const Chat: NextPage = () => {
  return (
    <div className="divide-y-[1px] py-10">
      {[1, 1, 1, 1, 1, 1].map((_, i) => (
        <div
          key={i}
          className="flex cursor-pointer items-center space-x-3  px-4 py-3 last:border-b-0"
        >
          <div className="h-12 w-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-gray-700">Steve Jebs</p>
            <p className=" text-medium text-sm  font-medium text-gray-500">
              See you tomorrow in the corner at 2pm
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
