export interface Task {
  id: number;
  title: string;  // Task title
  completed: boolean;  // Task status
  editing?: boolean;  // Task editing status
}
