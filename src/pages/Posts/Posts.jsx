import DefaultPicture from '../../assets/profile.png'
import Post from '../../components/Post/Post'
import styled from 'styled-components'
import { useState } from 'react'
import Loader from '../../utils/style/Atoms'
import { useFetch } from '../../utils/hooks/Hooks'

const freelanceProfiles = [
    {
        name: 'Jane Doe',
        jobTitle: 'Devops',
        picture: DefaultPicture,
    },
    {
        name: 'John Doe',
        jobTitle: 'Developpeur frontend',
        picture: DefaultPicture,
    },
    {
        name: 'Jeanne Biche',
        jobTitle: 'Développeuse Fullstack',
        picture: DefaultPicture,
    },
]

const PostsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
`

function Posts() {
    const { data, isLoading } = useFetch(`http://localhost:8000/survey`)
    const { surveyData } = data


 
  return (
      <div>
          <h1>Freelances 👩‍💻👨‍💻👩‍💻</h1>
          <PostsContainer>
          <Loader />
          {freelanceProfiles.map((profile, index) => (
              <Post
                  key={`${profile.name}-${index}`}
                  label={profile.jobTitle}
                  picture={profile.picture}
                  title={profile.name}
              />
          ))}
          </PostsContainer>
      </div>
  )
}

{freelanceProfiles.map((profile, index) => (
  <Post
      key={`${profile.name}-${index}`}
      label={profile.jobTitle}
      picture={profile.picture}
      title={profile.title}
  />
))}

export default Posts