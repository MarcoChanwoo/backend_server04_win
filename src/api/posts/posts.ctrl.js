let postId = 1;

// posts 배열 초기 데이터
const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용',
    },
];

/*
    POST /api/posts
    {title, body}
*/
exports.write = (ctx) => {
    const { title, body } = ctx.request.body;
    postId += 1;
    const post = { id: postId, title, body };
    posts.push(post);
    ctx.body = post;
};

/*
    GET /api/posts
*/
exports.list = (ctx) => {
    ctx.body = posts;
};

/* 특정 포스트 조회
    GET /api/posts/:id
*/
exports.read = (ctx) => {
    const { id } = ctx.params;
    const post = posts.find((p) => p.id.toString() === id);
    if (!post) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트 없음',
        };
        return;
    }
    ctx.body = post;
};

/* 특정 포스트 제거
    DELETE /api/posts/:id
*/
exports.remove = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트 없음',
        };
        return;
    }
    posts.splice(index, 1);
    ctx.status = 204;
};

/* 포스트 수정
    PUT /api/posts/:id
    {title, body}
*/
exports.replace = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트 없음',
        };
        return;
    }
    posts[index] = {
        id,
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};

/* 포스트 수정(특정 필드 변경)
    PATCH /api/posts/:id
    {title, body}
*/
exports.update = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트 없음',
        };
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};
