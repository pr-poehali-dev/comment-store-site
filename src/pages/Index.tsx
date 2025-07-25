import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Comment {
  id: string;
  author: string;
  message: string;
  timestamp: string;
}

const Index = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addComment = () => {
    if (author.trim() && message.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: author.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleString('ru-RU')
      };
      setComments([newComment, ...comments]);
      setAuthor('');
      setMessage('');
    }
  };

  const filteredComments = comments.filter(
    comment => 
      comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Система комментариев</h1>
          <p className="text-lg text-slate-600">Оставляйте комментарии и общайтесь с другими</p>
        </div>

        {/* Add Comment Form */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Icon name="MessageSquare" size={24} className="text-blue-600" />
              Новый комментарий
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Ваше имя"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <Textarea
              placeholder="Напишите ваш комментарий..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
            />
            <Button 
              onClick={addComment}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              disabled={!author.trim() || !message.trim()}
            >
              <Icon name="Send" size={16} className="mr-2" />
              Отправить комментарий
            </Button>
          </CardContent>
        </Card>

        {/* Search */}
        {comments.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Поиск по комментариям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <Card key={comment.id} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900">{comment.author}</h3>
                        <span className="text-sm text-slate-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{comment.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : comments.length > 0 ? (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Комментарии не найдены</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="MessageCircle" size={64} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">Пока комментариев нет</p>
              <p className="text-slate-400">Станьте первым, кто оставит комментарий!</p>
            </div>
          )}
        </div>

        {/* Stats */}
        {comments.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Всего комментариев: <span className="font-semibold text-slate-700">{comments.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;