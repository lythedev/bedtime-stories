import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic"; // Don't cache this page

export default async function DebugPage() {
  // Fetch all stories directly from Supabase
  const { data: stories, error } = await supabase.from("stories").select("*");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Supabase Debug Page</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          <h2 className="font-bold">Error:</h2>
          <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Stories in Supabase ({stories?.length || 0})</h2>

        {stories && stories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stories.map((story) => (
                  <tr key={story.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{story.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(story.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No stories found in Supabase.</p>
        )}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Supabase Connection Info</h2>
        <p className="mb-2">
          <span className="font-medium">URL:</span> {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </p>
        <p className="mb-2">
          <span className="font-medium">Key:</span> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10)}...
        </p>
      </div>
    </div>
  );
}
