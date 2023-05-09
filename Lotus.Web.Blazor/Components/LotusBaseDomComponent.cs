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
			protected internal String mID;
			protected internal Dictionary<String, Object> mAttributes;
			protected internal CClassMapper mClassMapper;
			protected internal CStyleMapper mStyleMapper;
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
                get { return (mID); }
                set { mID = value; }
			}

			/// <summary>
			/// Словарь дополнительных атрибутов HTML элемента
			/// </summary>
			[Parameter(CaptureUnmatchedValues = true)]
			public Dictionary<String, Object> Attributes
			{
				get { return (mAttributes); }
				set { mAttributes = value; }
			}

			/// <summary>
			/// Основной класс HTML элемента
			/// </summary>
			public CClassMapper ClassMapper
			{
				get { return (mClassMapper); }
			}

			/// <summary>
			/// Основной класс HTML элемента
			/// </summary>
			[Parameter]
			public String Class
			{
                get { return (mClassMapper.AsString()); }
                set { mClassMapper.SetFromString(value); }
			}

			/// <summary>
			/// Основной стиль HTML элемента
			/// </summary>
			public CStyleMapper StyleMapper
			{
				get { return (mStyleMapper); }
			}

			/// <summary>
			/// Основной стиль HTML элемента
			/// </summary>
			[Parameter]
			public String Style
			{
                get { return (mStyleMapper.AsString()); }
                set { mStyleMapper.SetFromString(value); }
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
				mID = "cubex_id_" + Guid.NewGuid().ToString();
				mClassMapper = new CClassMapper();
				mStyleMapper = new CStyleMapper();
				mAttributes = new Dictionary<String, Object>();
			}
			#endregion
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================