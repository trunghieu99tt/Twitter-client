import styled from "styled-components";

export const Wrapper = styled('div') <{
    shouldIndent?: boolean;
}>`
    display: flex;
    gap: 1rem;
    ${props => props.shouldIndent ? '' : 'transform: translateX(-4rem)'}
    margin-bottom: ${props => props.shouldIndent ? '1.8rem' : '1rem'};
`;

export const AuthorAvatar = styled.img`
    --size: 4rem;
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    border-radius: .8rem;
`;

export const Main = styled.div`
    
`;

export const MainInfo = styled.div`
    background: var(--light-2);
    padding: 1rem 1.5rem;
    border-radius: .8rem;
`;

export const AuthorName = styled.p`
    font-size: 1.4rem;
    font-weight: 500;
`;

export const Content = styled.p`
    color: var(--gray-2);
    font-size: 1.6rem;
`;

export const CreatedAt = styled.p`
    font-size: 1.2rem;
    color: var(--gray-4);
`;

export const Interaction = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.2rem;
    color: var(--gray-4);
`;

export const LikeButton = styled.button`
    cursor: pointer;
    display: flex;
    color: var(--gray-4);
    align-items: center;
    font-size: 1.2rem;
    gap: .5rem;
`;

export const LikeCounter = styled.div`
    word-spacing: .5rem;
`;

export const RepliesWrapper = styled.div``;