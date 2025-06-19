
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Criteria {
  id: number;
  name: string;
  description: string;
  weight: number;
  category: string;
}

const KriteriaGlobal = () => {
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([
    { id: 1, name: 'Pendidikan', description: 'Tingkat pendidikan yang dibutuhkan', weight: 25, category: 'Akademik' },
    { id: 2, name: 'Pengalaman Kerja', description: 'Lama pengalaman kerja yang relevan', weight: 30, category: 'Profesional' },
    { id: 3, name: 'Keterampilan Teknis', description: 'Kemampuan teknis spesifik', weight: 35, category: 'Teknis' },
    { id: 4, name: 'Soft Skills', description: 'Kemampuan interpersonal dan komunikasi', weight: 10, category: 'Personal' }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    weight: 0,
    category: ''
  });

  const handleEdit = (criteria: Criteria) => {
    setEditingId(criteria.id);
    setFormData({
      name: criteria.name,
      description: criteria.description,
      weight: criteria.weight,
      category: criteria.category
    });
  };

  const handleSave = () => {
    if (editingId) {
      setCriteriaList(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...formData }
          : item
      ));
      setEditingId(null);
    } else {
      const newCriteria: Criteria = {
        id: Date.now(),
        ...formData
      };
      setCriteriaList(prev => [...prev, newCriteria]);
      setShowAddForm(false);
    }
    setFormData({ name: '', description: '', weight: 0, category: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', description: '', weight: 0, category: '' });
  };

  const handleDelete = (id: number) => {
    setCriteriaList(prev => prev.filter(item => item.id !== id));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Akademik': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Profesional': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Teknis': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Personal': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kriteria Global</h1>
          <p className="text-muted-foreground">Kelola kriteria penilaian untuk semua pekerjaan</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="gradient-blue"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kriteria
        </Button>
      </div>

      {/* Weight Summary */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Ringkasan Bobot</CardTitle>
          <CardDescription>Total bobot semua kriteria harus 100%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Bobot:</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">
                {criteriaList.reduce((sum, criteria) => sum + criteria.weight, 0)}%
              </span>
              <Badge 
                variant={criteriaList.reduce((sum, criteria) => sum + criteria.weight, 0) === 100 ? 'default' : 'destructive'}
                className={criteriaList.reduce((sum, criteria) => sum + criteria.weight, 0) === 100 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                }
              >
                {criteriaList.reduce((sum, criteria) => sum + criteria.weight, 0) === 100 ? 'Valid' : 'Tidak Valid'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Form */}
      {showAddForm && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Tambah Kriteria Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Kriteria</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Masukkan nama kriteria"
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Masukkan kategori"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Masukkan deskripsi kriteria"
              />
            </div>
            <div>
              <Label htmlFor="weight">Bobot (%)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
                placeholder="Masukkan bobot (0-100)"
                min="0"
                max="100"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="gradient-blue">
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Criteria List */}
      <div className="grid gap-6">
        {criteriaList.map((criteria) => (
          <Card key={criteria.id} className="bg-card/50 border-border">
            <CardContent className="p-6">
              {editingId === criteria.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`edit-name-${criteria.id}`}>Nama Kriteria</Label>
                      <Input
                        id={`edit-name-${criteria.id}`}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`edit-category-${criteria.id}`}>Kategori</Label>
                      <Input
                        id={`edit-category-${criteria.id}`}
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`edit-description-${criteria.id}`}>Deskripsi</Label>
                    <Textarea
                      id={`edit-description-${criteria.id}`}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edit-weight-${criteria.id}`}>Bobot (%)</Label>
                    <Input
                      id={`edit-weight-${criteria.id}`}
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="gradient-blue">
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={handleCancel} size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{criteria.name}</h3>
                      <Badge className={getCategoryColor(criteria.category)}>
                        {criteria.category}
                      </Badge>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {criteria.weight}%
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{criteria.description}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(criteria)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(criteria.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KriteriaGlobal;
