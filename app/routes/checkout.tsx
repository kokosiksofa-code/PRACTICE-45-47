import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";  
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

// Мета-данные для SEO
export function meta() {
    return [{ title: "Оформление заказа | MeowQ" }];
}

// Экспортируем компонент CheckoutPage по умолчанию
export default function CheckoutPage() {
    // ИСПРАВЛЕНО: правильное использование useCart
    const { items, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    
    // Состояния формы
    const [name, setName] = useState("");         
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card"); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Если корзина пуста
    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-tom-thumb-700 mb-4">
                    Нечего оформлять
                </h2> 
                <Link to="/menu" className="text-tom-thumb-600 hover:text-tom-thumb-700 hover:underline text-lg transition-colors">
                    Перейти в меню 
                </Link>
            </div>
        );
    }
    
    // Обработчик отправки формы
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Валидация
        if (!name.trim() || !phone.trim()) {
            alert("Заполните имя и телефон");
            return;
        }
        
        setIsProcessing(true);
        
        // Имитация отправки заказа на сервер
        setTimeout(() => {
            setIsProcessing(false);
            setIsModalOpen(true);  // Открываем модальное окно с подтверждением
        }, 2000);
    };
    
    // Закрыть модальное окно и очистить корзину
    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearCart();  // Очищаем корзину
        navigate("/");  // Перенаправляем на главную
    };
    
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-tom-thumb-800 mb-8 text-center"> 
                Оформление заказа
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Поле Имя */}
                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Ваше имя *
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-tom-thumb-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400 focus:border-transparent transition-all"
                        placeholder="Имя Фамилия"
                    />
                </div>
                
                {/* Поле Телефон */}
                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Телефон *
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full border border-tom-thumb-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400 focus:border-transparent transition-all"
                        placeholder="+7 (999) 799-88-99"
                    />
                </div>
                
                {/* Комментарий */}
                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Комментарий к заказу
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-tom-thumb-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400 focus:border-transparent transition-all"
                        rows={3}
                        placeholder="Пожелания, аллергии, особые просьбы..."
                    />
                </div>
                
                {/* Способ оплаты */}
                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Способ оплаты
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                                className="accent-tom-thumb-600 w-4 h-4"
                            />
                            Картой онлайн
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="cash"
                                checked={paymentMethod === "cash"}
                                onChange={() => setPaymentMethod("cash")}
                                className="accent-tom-thumb-600 w-4 h-4"
                            />
                            Наличными
                        </label>
                    </div>
                </div>
                
                {/* Блок с деталями заказа */}
                <div className="bg-tom-thumb-50 rounded-2xl p-5 border border-tom-thumb-100">
                    <h3 className="font-bold text-tom-thumb-800 mb-3">Ваш заказ:</h3>
                    {/* Список товаров в заказе */}
                    {items.map((item) => (
                        <div 
                            key={item.menuItem.id}
                            className="flex justify-between text-stone-600 mb-1"
                        >
                            <span>
                                {item.menuItem.name} × {item.quantity}
                            </span>
                            <span>{item.menuItem.price * item.quantity} ₽</span>
                        </div>
                    ))}
                    {/* Итоговая сумма */}
                    <div className="border-t border-tom-thumb-200 mt-3 pt-3 flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span className="text-tom-thumb-700">{totalAmount} ₽</span>
                    </div>
                </div>

                {/* Кнопка оплаты */}
                <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 text-lg"
                >
                    {isProcessing ? "Обработка платежа..." : "Оплатить заказ"}
                </Button>
            </form>

            {/* Модальное окно с подтверждением */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Заказ оформлен!"
            >
                <div className="text-center py-4">
                    <p className="text-lg text-tom-thumb-700 font-medium mb-2">
                        Спасибо, {name}!
                    </p>
                    <p className="text-stone-500 mb-6">
                        Ваш заказ на сумму <span className="font-bold text-tom-thumb-600">{totalAmount} ₽</span> принят.
                        Мы свяжемся с вами по телефону <span className="font-medium text-tom-thumb-600">{phone}</span>.
                    </p>
                    <Button onClick={handleCloseModal} className="w-full bg-tom-thumb-600 hover:bg-tom-thumb-700">
                        На главную
                    </Button>
                </div>
            </Modal>
        </div>
    );
}