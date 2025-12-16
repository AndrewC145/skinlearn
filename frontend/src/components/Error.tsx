/* eslint-disable @typescript-eslint/no-explicit-any */

function Error({ err }: { err: any }) {
  return <p className="text-sm text-red-500">{err?.message}</p>;
}

export default Error;
