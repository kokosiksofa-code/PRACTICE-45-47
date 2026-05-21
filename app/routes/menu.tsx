import { useState } from "react";
import { menuData } from "../data/menu";
import MenuCard from "../components/MenuCard";
import { useCart } from "../hooks/useCart";
import type { MenuItem } from "../types";
// Мета-данные для SEO (заголовок страницы)
export function meta() {
    return [
        { title: "Меню | MeowQ" }
    ];
}

// Экспортируем компонент MenuPage по умолчанию
export default function MenuPage() {
    // Категории для фильтрации (добавлена категория "Все")
    const categories = ["Все", "Закуски", "Основные блюда", "Десерты", "Напитки"];
    // Состояние активной категории (по умолчанию "Все")
    const [activeCategory, setActiveCategory] = useState("Все");
    // Получаем функции и данные из контекста корзины
    const { totalCount, addItem } = useCart();

    // Фильтрация блюд по выбранной категории
    const filteredMenu = activeCategory === "Все"
        ? menuData
        : menuData.filter(item => item.category === activeCategory);

    // Функция добавления блюда в корзину
    const addToCart = (item: MenuItem) => {
        addItem(item);  // Добавляем блюдо в корзину
    };

    // Рендер компонента
    return (
        <div>
            {/* Верхняя панель: заголовок + счётчик блюд */}
            <div className="flex justify-between items-center mb-8">
                {/* Заголовок страницы */}
                <h1 className="text-4xl font-bold text-tom-thumb-800">Меню</h1> 
                {/* Счётчик блюд в корзине */}
                <span className="bg-tom-thumb-100 text-tom-thumb-800 px-4 py-2 rounded-full">
                    {totalCount} блюд  {/* Отображает общее количество товаров в корзине */}
                </span>
            </div>

            {/* Строка фильтрации по категориям (кнопки) */}
            <div className="flex gap-3 mb-8 flex-wrap">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full border transition-colors ${activeCategory === cat 
                                ? "bg-tom-thumb-600 text-white border-tom-thumb-600 shadow-md" 
                                : "bg-white text-tom-thumb-700 border-tom-thumb-200 hover:bg-tom-thumb-50 hover:border-tom-thumb-300" 
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Сетка с карточками блюд */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenu.map(item => (
                    <MenuCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}