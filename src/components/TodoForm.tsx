'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ModeToggle } from './ModeToggle'
import { IListObj } from './Store'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

const FormSchema = z.object({
  Task: z.string().min(2, {
    message: 'Task must be at least 2 characters.'
  }),
  Des: z.string().min(2, {
    message: 'Description must be at least 2 characters.'
  })
})

function TodoFormContent() {
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Task: '',
      Des: ''
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const newTask = {
        ...data,
        StartTime: new Date().toISOString(),
        FinishTime: '',
        State: false
      }

      const response = await fetch('/api/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      return response.json()
    },
    onMutate: async newTask => {
      // 取消任何正在进行的重新获取
      await queryClient.cancelQueries({ queryKey: ['getData'] })

      // 保存之前的数据
      const previousTasks = queryClient.getQueryData(['getData'])

      // 乐观更新
      queryClient.setQueryData(['getData'], (old: IListObj[]) => {
        const optimisticTask = {
          ...newTask,
          id: Date.now(), // 临时ID
          StartTime: new Date().toISOString(),
          FinishTime: '',
          State: false
        }
        return [...(old || []), optimisticTask]
      })

      return { previousTasks }
    },
    onError: (err, newTask, context) => {
      // 发生错误时回滚
      queryClient.setQueryData(['getData'], context?.previousTasks)
      toast({
        title: 'Error',
        description: 'Failed to create task. Please try again.',
        variant: 'destructive'
      })
    },
    onSettled: () => {
      // 无论成功或失败，都重新获取数据
      queryClient.invalidateQueries({ queryKey: ['getData'] })
      form.reset()
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">
        <div className="flex justify-start space-x-2">
          <FormField
            control={form.control}
            name="Task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Input placeholder="Task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Des"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-start space-x-1">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
          <ModeToggle />
        </div>
      </form>
    </Form>
  )
}

export default function TodoForm() {
  return <TodoFormContent />
}
