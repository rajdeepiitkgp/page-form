'use server';

import { EmptyFormErr, UserNotFoundErr } from '@/Errors/ErrorTypes';
import prisma from '@/lib/prisma';
import { formSchema, formSchemaType } from '@/schemas/form';
import { currentUser } from '@clerk/nextjs/server';

export const GetFormStats = async () => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
};

export const CreateForm = async (data: formSchemaType) => {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('Form not valid');
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description } = data;
  const form = await prisma.form.create({
    data: { userId: user.id, name, description },
  });

  if (!form) {
    throw new Error('Something went wrong');
  }
  return form.id;
};

export const GetForms = async () => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const GetFormById = async (id: number) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
};

export const UpdateFormContent = async (id: number, jsonElements: string) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonElements,
    },
  });
};

export const PublishForm = async (id: number) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const currentForm = await GetFormById(id);
  if (!currentForm) throw new Error('Form not found');
  const { content } = currentForm;
  if (!content || content === '[]') throw new EmptyFormErr();
  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
};

export const GetFormContentByUrl = async (formUrl: string) => {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
};

export const SubmitForm = async (formUrl: string, content: string) => {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
};

export const GetFormWithSubmissions = async (id: number) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
};

