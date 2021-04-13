using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IPostRepository
    {
        IEnumerable<Post> GetPosts();

        Post GetPost(int postId);

        int AddPost(string postName);

        bool UpdatePost(int postId, string postName);

        bool DeletePost(int postId);
    }
}
