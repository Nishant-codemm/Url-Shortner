import { Link as LinkIcon, Zap } from "lucide-react";

export default function CreateLinkForm({
  register,
  handleSubmit,
  onSubmit,
  loading,
}) {
  return (
    <div className="relative group mt-12">
      {/* Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 blur opacity-20 transition group-hover:opacity-30" />

      <div className="relative rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-xl shadow-xl p-6 md:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* URL */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Destination URL
              </label>
              <div className="relative">
                <LinkIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="url"
                  {...register("fullUrl")}
                  required
                  placeholder="https://example.com/very-long-url"
                  className="
                    w-full pl-12 pr-4 py-3 rounded-xl
                    bg-black-900 text-gray-100
                    border border-gray-700
                    placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                    transition
                  "
                />
              </div>
            </div>

            {/* Custom Slug */}
            <div className="md:w-1/3">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Custom Slug
                <span className="text-gray-500 ml-1">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  /
                </span>
                <input
                  {...register("userSlug")}
                  placeholder="my-link"
                  className="
                    w-full pl-8 pr-4 py-3 rounded-xl
                    bg-black-900 text-gray-100
                    border border-gray-700
                    placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                    transition
                  "
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full h-12 rounded-xl
              bg-blue-600 hover:bg-blue-500 active:bg-blue-700
              text-white font-semibold
              flex items-center justify-center gap-2
              shadow-lg shadow-blue-600/20
              transition-all
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Shortening…
              </>
            ) : (
              <>
                <Zap size={18} />
                Shorten Now
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
