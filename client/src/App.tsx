import React, { useState, useEffect } from "react";
import { Table, Form, Input, Select, DatePicker, Switch, Button, Modal, notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Option } = Select;

interface Task {
  _id: string;
  title: string;
  priority: string;
  dueDate: string;
  status: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Task[]>(`${process.env.REACT_API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch tasks." });
    } finally {
      setLoading(false);
    }
  };

  // Add or update task
  const handleFormSubmit = async (values: Omit<Task, "id">) => {
    try {
      if (currentTask) {
        // Update Task
        await axios.put(`${process.env.REACT_API_BASE_URL}/tasks/${currentTask._id}`, values);
        notification.success({ message: "Task updated successfully!" });
      } else {
        // Add Task
        await axios.post(`${process.env.REACT_API_BASE_URL}/tasks`, values);
        notification.success({ message: "Task added successfully!" });
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchTasks();
    } catch (error) {
      notification.error({ message: "Error submitting task." });
    }
  };

  // Delete task
  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_API_BASE_URL}/tasks/${id}`);
      notification.success({ message: "Task deleted successfully!" });
      fetchTasks();
    } catch (error) {
      notification.error({ message: "Failed to delete task." });
    }
  };

  // Open modal for editing a task
  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    form.setFieldsValue({
      ...task,
      dueDate: dayjs(task.dueDate),
    });
    setIsModalOpen(true);
  };

  // Reset modal and form on close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
    form.resetFields();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Table columns
  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <p
          className={`${
            status ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
          } text-white inline-flex text-xs py-1 px-3 rounded-full border`}>
          {status ? (
            <span className="text-green-500 flex gap-1">
              <CheckCircleOutlined /> Completed
            </span>
          ) : (
            <div className="text-red-500 flex gap-1">
              <CloseCircleOutlined /> Not Completed
            </div>
          )}
        </p>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, task: Task) => (
        <div>
          <Button type="link" className="p-0" onClick={() => handleEditTask(task)}>
            <EditOutlined />
          </Button>
          <Button type="link" danger onClick={() => handleDeleteTask(task._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Task List</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Task
        </Button>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <Table dataSource={tasks} columns={columns} rowKey="id" loading={loading} pagination={{ pageSize: 5 }} />
      </div>

      {/* Modal for Add/Edit Task */}
      <Modal
        title={currentTask ? "Edit Task" : "Add Task"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ status: false }}>
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: "Please enter the task title" }]}>
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item name="priority" label="Priority" rules={[{ required: true, message: "Please select a priority" }]}>
            <Select placeholder="Select priority">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: "Please select a due date" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked" rules={[{ required: true }]}>
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {currentTask ? "Update Task" : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
