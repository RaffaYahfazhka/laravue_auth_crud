<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'status' => 'required|string',
        ]);


        // Create and save the new post
        $post = new Post([
            'nama' => $request->input('nama'),
            'status' => $request->input('status'),
        ]);

        $post->save();

        return response()->json(['message' => 'Post created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:255',
            'status' => 'required|string', 
        ]);


        // Update post data
        $post->nama = $request->input('nama');
        $post->status = $request->input('status');
        $post->save();

        return response()->json(['message' => 'Post updated successfully']);
    }

    public function index()
    {
        $posts = Post::all();
        return response()->json(['data' => $posts]);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}


 ?>