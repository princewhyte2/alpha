import { ReactElement, useCallback, useState, useRef, FormEvent, useMemo } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import NavLayout from "../../components/layouts/nav"
import { useRouter } from "next/router"
import useSWR, { useSWRConfig } from "swr"
import postService from "../../services/post"
import PostCard from "../../components/posts/card"
import profileServices from "../../services/profile"
import { ErrorComponent } from "../../components/alert"

function Page() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<"error" | "success">("error")

  const postId = router.query.id as string
  const { data: appUser } = useSWR("userProfile", profileServices.profileFetcher)

  const { data: post } = useSWR(postId ? `/posts/${postId}` : null, postService.getSinglePost)
  const handleLike = useCallback(
    (postId: number) => async () => {
      try {
        if (!appUser) {
          router.push(`/auth/login?redirect=/posts/${postId}`)
          return
        }
        await postService.likePost(String(postId))
        mutate(`/posts/${postId}`)
        // console.log("like", response)
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }
        setIsError(true)
      }
    },
    [],
  )

  const handlePostShare = useCallback(
    (postId: string) => () => {
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this amazing post on workfynder",
            url: `${window.location.origin}/posts/${postId}`,
            text: "Check out this amazing post on workfynder",
          })
          .then(() => {
            console.log("Thanks for sharing!", postId)
          })
          .catch(console.error)
      } else {
        console.log("no active share")
      }
    },
    [],
  )

  const handleUnLike = useCallback(
    (postId: number) => async () => {
      try {
        if (!appUser) {
          router.push(`/auth/login?redirect=/posts/${postId}`)
          return
        }
        await postService.unlikePost(String(postId))
        mutate(`/posts/${postId}`)
        // console.log("like", response)
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }
        setIsError(true)
      }
    },
    [],
  )
  const handleComment = useCallback(async (postId: number, comment: string) => {
    try {
      if (!appUser) {
        router.push(`/auth/login?redirect=/posts/${postId}`)
        return
      }
      const response = await postService.addComment(String(postId), { body: comment })
      mutate(`/posts/${postId}/comments`)
      // setMessage(response?.message)
      // setType("success")
      // setIsError(true)
      console.log("comment", response)
    } catch (error: any) {
      // setType("error")
      // if (error.response) {
      //   setMessage(error.response.data.message)
      // } else if (error.request) {
      //   console.log(error.request)
      // } else {
      //   console.log("Error", error.message)
      // }
      // setIsError(true)
    }
  }, [])

  const handleEdit = useCallback(
    (postItem: any) => () => {
      const content = JSON.parse(postItem.body)
      // setIsPost(true)
      // setIsEditPost(true)
      // setInitContent(content)
      // setEditId(postItem.id)

      // setFiles(postItem.relationships.medias)
      // setMediaType(postItem.relationships.medias[0]?.type)
    },
    [],
  )

  const handleDelete = useCallback(
    (postId: number) => async () => {
      try {
        // const response = await postService.deletePost(String(postId))
        // mutate("posts")
        // setMessage(response?.message)
        // setType("success")
        // setIsError(true)
      } catch (error: any) {
        // setType("error")
        // if (error.response) {
        //   setMessage(error.response.data.message)
        // } else if (error.request) {
        //   console.log(error.request)
        // } else {
        //   console.log("Error", error.message)
        // }
        // setIsError(true)
      }
    },
    [],
  )

  console.log("post", post)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container disableGutters maxWidth="md">
        <Grid container sx={{ py: 4 }} spacing={2}>
          <Grid item xs={12}>
            {post && (
              <PostCard
                item={post}
                onUnLike={handleUnLike}
                onLike={handleLike}
                onComment={handleComment}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSharePost={handlePostShare}
                isFullPage={true}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

// Page.requireAuth = true

export default Page
