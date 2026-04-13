import { useAppSelector } from "../hooks";

export default function Profile() {
  const user = useAppSelector((state) => state.accountReducer.currentUser);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">Your Profile</h1>
        <p className="mt-2 text-slate-600">
          Account details currently stored from your authenticated session.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">First name</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{user?.first_name}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Last name</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{user?.last_name}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{user?.email}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-1 text-lg font-semibold capitalize text-slate-900">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
