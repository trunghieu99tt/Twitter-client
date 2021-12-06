import React, { useEffect, useRef } from "react";
import SimpleReactLightbox from "simple-react-lightbox";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";

// talons
import { useChatPage } from "./useChatPage";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";

// components
import Logo from "@components/Logo";
import Modal from "@components/Modal";
import UserCard from "@components/UserCard";
import { Spinner1 } from "@components/Loaders";
import RoomList from "@components/Chat/RoomList";
import PageMetadata from "@components/PageMetadata";
import MessageContent from "@components/Chat/MessageContent";
import RoomImageGallery from "@components/Chat/RoomImageGallery";
import TextMessageForm from "@components/Chat/MessageForms/TextMessageForm";
import ImageMessageForm from "@components/Chat/MessageForms/ImageMessageForm";

// icons
import { IoCallSharp } from "react-icons/io5";

// images
import DefaultUnknownAvatar from "@images/user.png";

// types
import { iMessage } from "@type/message.types";
import { iUser } from "@type/user.types";

// styles
import classes from "./chatPage.module.css";

import { roomsHaveCallState } from "states/call.state";

const ChatPage = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const {
        room,
        loading,
        message,
        messages,
        guestUser,
        chatImages,
        currentUser,
        chosenEmoji,
        messageImage,
        totalMessage,
        showMemberList,

        onSubmit,
        onChange,
        triggerCall,
        fetchNextPage,
        setChosenEmoji,
        setShowMemberList,
        onCloseImageMessageForm,
        openCreateNewGroupChatModal,
    } = useChatPage();
    const roomsHaveCall = useRecoilValue(roomsHaveCallState);

    const messageDiv = useRef<HTMLElement | null>(null);
    const loadMoreRef = useRef() as React.RefObject<HTMLDivElement>;

    const hasMore = totalMessage > messages?.length;
    const [shouldJumpToEnd, setShouldJumpToEnd] = React.useState(true);

    useIntersectionObserver({
        target: loadMoreRef,
        enabled: hasMore,
        onIntersect: () => {
            setShouldJumpToEnd(false);
            fetchNextPage();
        },
    });

    useEffect(() => {
        if (shouldJumpToEnd && messageDiv && messageDiv.current) {
            messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        console.log(`roomsHaveCall`, roomsHaveCall);
    }, [roomsHaveCall]);

    const { isDm, members, image, name } = room || {};

    let roomImage = image || "";
    let roomName = name || "";

    if (isDm) {
        roomImage = guestUser?.avatar || DefaultUnknownAvatar;
        roomName = guestUser?.name || "";
    }

    const roomMemberList = members?.map((member: iUser) => (
        <UserCard user={member} key={`room-member-card-${member._id}`} />
    ));

    const isRoomHavingCall = room && roomsHaveCall.includes(room._id);

    return (
        <React.Fragment>
            <PageMetadata title={t("chatPage")} />
            <Modal
                body={roomMemberList}
                header={t("roomMemberList")}
                isOpen={showMemberList}
                onCancel={() => setShowMemberList(false)}
            />
            {loading && <Spinner1 />}

            <div className={classes.root}>
                <aside className={classes.userList}>
                    <div className={classes.logo}>
                        <Logo />
                    </div>
                    <button
                        className={classes.newGroupChat}
                        onClick={openCreateNewGroupChatModal}
                    >
                        {t("createNewGroupChat")}
                    </button>
                    <RoomList />
                </aside>
                <main className={classes.main}>
                    <section className={classes.mainHeader}>
                        <div className={classes.headerInner}>
                            <div className={classes.left}>
                                <figure className={classes.roomImage}>
                                    <img
                                        src={roomImage}
                                        alt={`${guestUser?.name}-wallpaper`}
                                    />
                                </figure>
                                <h2 className={classes.roomName}>{roomName}</h2>
                            </div>
                            <div className={classes.right}>
                                {isRoomHavingCall && (
                                    <button
                                        onClick={() => {
                                            history.push(`/call/${room?._id}`);
                                        }}
                                    >
                                        Go to call
                                    </button>
                                )}
                                <button
                                    className={classes.callButton}
                                    onClick={() => triggerCall()}
                                >
                                    <IoCallSharp />
                                </button>
                            </div>
                        </div>
                    </section>
                    <section className={classes.chatContent}>
                        <div className={classes.content}>
                            {messageImage.url && (
                                <ImageMessageForm
                                    data={messageImage}
                                    onCancel={onCloseImageMessageForm}
                                    onChange={onChange}
                                    onSubmit={(e: any) => {
                                        onSubmit(e);
                                        setShouldJumpToEnd(true);
                                    }}
                                />
                            )}

                            <section
                                className={classes.messageContainer}
                                ref={messageDiv}
                            >
                                {hasMore && (
                                    <div ref={loadMoreRef}>Loading...</div>
                                )}
                                {messages?.map((message: iMessage) => {
                                    return (
                                        <MessageContent
                                            key={`message-${message._id}`}
                                            data={message}
                                            isMyMessage={
                                                message.author._id ===
                                                currentUser._id
                                            }
                                        />
                                    );
                                })}
                            </section>

                            <TextMessageForm
                                onChange={onChange}
                                onSubmit={onSubmit}
                                chosenEmoji={chosenEmoji}
                                setChosenEmoji={setChosenEmoji}
                                value={message}
                            />
                        </div>
                    </section>
                </main>
                <aside>
                    <article className={classes.roomInfo}>
                        <figure className={classes.roomInfoImageWrapper}>
                            <img
                                src={roomImage}
                                alt={`${roomName}-bg`}
                                className={classes.roomInfoImage}
                            />
                            <figcaption className={classes.roomInfoName}>
                                {roomName}
                            </figcaption>
                        </figure>
                    </article>

                    {!isDm && (
                        <button
                            className={classes.showRoomMemberListBtn}
                            onClick={() => setShowMemberList(true)}
                        >
                            {t("roomMemberList")}
                        </button>
                    )}

                    <SimpleReactLightbox>
                        <RoomImageGallery images={chatImages} />
                    </SimpleReactLightbox>
                </aside>
            </div>
        </React.Fragment>
    );
};

export default ChatPage;
