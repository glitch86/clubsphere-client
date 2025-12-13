import React from "react";

const MemberTable = () => {
  return (
    <div className="overflow-x-auto w-full md:w-fit">
      <table className="table">
        {/* head */}
        <thead>Members()</thead>
        <tbody>
          {/* row 1 */}
          <tr className="bg-base-200 rounded-2xl">
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
