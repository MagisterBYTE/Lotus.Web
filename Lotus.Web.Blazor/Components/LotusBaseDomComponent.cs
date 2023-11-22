//=====================================================================================================================
// Проект: Модуль Blazor платформы Web
// Раздел: Подсистема компонентов
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusBaseDomComponent.cs
*		Базовой компонент для представления элемента как DOM элемента.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Components;
//=====================================================================================================================
namespace Lotus
{
	namespace Web
	{
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup WebBlazorComponents Подсистема компонентов
         * \ingroup WebBlazor
         * \brief Подсистема компонентов.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Базовой компонент для представления элемента как DOM элемента
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class LotusBaseDomComponent : ComponentBase
		{
			#region ======================================= ДАННЫЕ ====================================================
			// Основные параметры
			protected internal String _id;
			protected internal Dictionary<String, Object> _attributes;
			protected internal CClassMapper _classMapper;
			protected internal CStyleMapper _styleMapper;
			#endregion

			#region ======================================= СВОЙСТВА ==================================================
			//
			// ОСНОВНЫЕ ПАРАМЕТРЫ
			//
			/// <summary>
			/// Основной идентификатор HTML элемента
			/// </summary>
			[Parameter]
			public String ID
			{
                get { return (_id); }
                set { _id = value; }
			}

			/// <summary>
			/// Словарь дополнительных атрибутов HTML элемента
			/// </summary>
			[Parameter(CaptureUnmatchedValues = true)]
			public Dictionary<String, Object> Attributes
			{
				get { return (_attributes); }
				set { _attributes = value; }
			}

			/// <summary>
			/// Основной класс HTML элемента
			/// </summary>
			public CClassMapper ClassMapper
			{
				get { return (_classMapper); }
			}

			/// <summary>
			/// Основной класс HTML элемента
			/// </summary>
			[Parameter]
			public String Class
			{
                get { return (_classMapper.AsString()); }
                set { _classMapper.SetFromString(value); }
			}

			/// <summary>
			/// Основной стиль HTML элемента
			/// </summary>
			public CStyleMapper StyleMapper
			{
				get { return (_styleMapper); }
			}

			/// <summary>
			/// Основной стиль HTML элемента
			/// </summary>
			[Parameter]
			public String Style
			{
                get { return (_styleMapper.AsString()); }
                set { _styleMapper.SetFromString(value); }
			}
			#endregion

			#region ======================================= КОНСТРУКТОРЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Конструктор инициализирует данные компонента предустановленными данными
			/// </summary>
			//---------------------------------------------------------------------------------------------------------
			public LotusBaseDomComponent()
			{
				_id = "cubex_id_" + Guid.NewGuid().ToString();
				_classMapper = new CClassMapper();
				_styleMapper = new CStyleMapper();
				_attributes = new Dictionary<String, Object>();
			}
			#endregion
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================