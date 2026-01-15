package org.dromara.common.core.convert;

import java.util.List;

/**
 * 基础转换器接口
 * <p>
 * 定义实体类(Entity)、数据传输对象(DTO)、视图对象(VO)之间的转换规范
 * 使用 MapStruct 实现具体转换逻辑
 * </p>
 *
 * @param <E> 实体类类型
 * @param <D> 数据传输对象类型
 * @param <V> 视图对象类型
 * @author Turbo-Stack
 */
public interface BaseConvert<E, D, V> {

    /**
     * DTO 转 Entity
     *
     * @param dto 数据传输对象
     * @return 实体对象
     */
    E toEntity(D dto);

    /**
     * Entity 转 DTO
     *
     * @param entity 实体对象
     * @return 数据传输对象
     */
    D toDto(E entity);

    /**
     * Entity 转 VO
     *
     * @param entity 实体对象
     * @return 视图对象
     */
    V toVo(E entity);

    /**
     * Entity 列表转 VO 列表
     *
     * @param entityList 实体对象列表
     * @return 视图对象列表
     */
    List<V> toVoList(List<E> entityList);

    /**
     * DTO 列表转 Entity 列表
     *
     * @param dtoList 数据传输对象列表
     * @return 实体对象列表
     */
    List<E> toEntityList(List<D> dtoList);

    /**
     * Entity 列表转 DTO 列表
     *
     * @param entityList 实体对象列表
     * @return 数据传输对象列表
     */
    List<D> toDtoList(List<E> entityList);
}
