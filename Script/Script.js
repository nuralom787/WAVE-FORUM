const LoadAllPost = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
};
LoadAllPost();


const displayPosts = async (data) => {
    const postContainer = document.getElementById("posts-container");
    data.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex items-start bg-[#797DFC1A] border border-[#797DFC] rounded-2xl p-8 gap-6">
            <img class="rounded-xl w-20" src="${post.image}" alt="">
                <div class="space-y-6 flex-auto">
                    <span class="text-sm font-medium text-[#12132DCC] font-inter"># ${post.category}</span>
                    <span class="text-sm font-medium text-[#12132DCC] font-inter ml-4">Author: ${post.author?.name}</span>
                    <h1 class="text-[#12132D] text-xl font-bold">${post.title}</h1>
                    <p class="text-base font-normal font-inter text-[#12132D99] border-b border-dashed border-b-[#12132D40] pb-4">
                    ${post.description}
                    </p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-10">
                            <div class="flex gap-4">
                                <img src="images/comment.svg" alt="">
                                    <span>${post.comment_count}</span>
                            </div>
                            <div class="flex gap-4">
                                <img src="images/view.svg" alt="">
                                    <span>${post.view_count}</span>
                            </div>
                            <div class="flex gap-4">
                                <img src="images/time.svg" alt="">
                                    <span>${post.posted_time}</span>
                            </div>
                        </div>
                        <button>
                            <img src="images/markasread.svg" alt="">
                        </button>
                    </div>
                </div>
        </div>
        `
        console.log(post);
        postContainer.appendChild(div);
    })
}