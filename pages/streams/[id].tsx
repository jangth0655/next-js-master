import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Message as PrismaMessage, Stream } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import UserUser from "@libs/client/useUser";
import { useEffect } from "react";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessage extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessage;
}

interface MessageForm {
  message: string;
}

interface SendMessage {
  ok: boolean;
  message: PrismaMessage;
}

const StreamDetail: NextPage = () => {
  const { user } = UserUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, error, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  const [sendMessage, { data: sendMessageData, loading }] =
    useMutation<SendMessage>(`/api/streams/${router.query.id}/messages`);
  const onValid = (form: MessageForm) => {
    if (loading) return;
    mutate(
      (pre) =>
        pre &&
        ({
          ...pre,
          stream: {
            ...pre.stream,
            messages: [
              ...pre.stream.messages,
              { id: Date.now(), message: form.message, user: { ...user } },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
    reset();
  };

  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10  px-4">
        {data?.stream.cloudflareId ? (
          <iframe
            className="aspect-video w-full rounded-md shadow-sm"
            src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>
        ) : null}

        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">
            ${data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
          <div className="flex flex-col space-y-3 overflow-scroll rounded-md bg-orange-300 p-5">
            <span>Stream Keys (secret)</span>
            <span className="text-gray-600">
              <span className="font-medium text-gray-800">Url</span> :{" "}
              {data?.stream.cloudflareUrl}
            </span>
            <span className="text-gray-600">
              <span className="font-medium text-gray-800">Key</span> :{" "}
              {data?.stream.cloudflareKey}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>

          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16">
            {data?.stream?.messages?.map((message) => (
              <Message
                key={message?.id}
                message={message?.message}
                reversed={message?.user?.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed inset-x-0 bottom-0  bg-white py-2">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative mx-auto flex w-full  max-w-md items-center"
            >
              <input
                {...register("message", { required: true })}
                type="text"
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
